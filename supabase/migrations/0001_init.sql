-- Salas Hub — schema inicial

create extension if not exists btree_gist;

-- ============================================================
-- TABELAS
-- ============================================================

create table empresas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  created_at timestamptz not null default now()
);

create table perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  email text,
  empresa_id uuid references empresas(id),
  role text not null default 'colaborador' check (role in ('admin','colaborador')),
  google_connected boolean not null default false,
  created_at timestamptz not null default now()
);

create table salas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  andar text,
  capacidade int,
  cor text not null default '#3457D5',
  ativa boolean not null default true,
  created_at timestamptz not null default now()
);

create table reservas (
  id uuid primary key default gen_random_uuid(),
  sala_id uuid not null references salas(id),
  usuario_id uuid not null references perfis(id),
  empresa_id uuid references empresas(id),
  titulo text not null,
  inicio timestamptz not null,
  fim timestamptz not null,
  status text not null default 'confirmada' check (status in ('confirmada','cancelada')),
  cancelado_em timestamptz,
  cancelado_por uuid references perfis(id),
  google_event_id text,
  created_at timestamptz not null default now(),
  constraint reservas_periodo_valido check (fim > inicio)
);

-- Impede duas reservas confirmadas sobrepostas na mesma sala (nível de banco, não só UI).
alter table reservas add constraint reservas_sem_conflito
  exclude using gist (
    sala_id with =,
    tstzrange(inicio, fim) with &&
  ) where (status = 'confirmada');

create table google_tokens (
  usuario_id uuid primary key references perfis(id) on delete cascade,
  refresh_token text not null,
  access_token_cache text,
  expiry timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Cria o perfil automaticamente quando alguém se cadastra (nome/empresa vêm do
-- options.data passado em supabase.auth.signUp no formulário de cadastro).
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.perfis (id, nome, email, empresa_id)
  values (
    new.id,
    new.raw_user_meta_data->>'nome',
    new.email,
    (new.raw_user_meta_data->>'empresa_id')::uuid
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- empresa_id da reserva vem do perfil do dono, não do client — evita reserva
-- gravada com empresa errada (o que quebraria as métricas por empresa).
create or replace function public.set_reserva_empresa()
returns trigger as $$
begin
  select empresa_id into new.empresa_id from perfis where id = new.usuario_id;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger reservas_set_empresa
  before insert on reservas
  for each row execute function public.set_reserva_empresa();

-- Carimba quem cancelou e quando, sempre que o status vira 'cancelada'.
create or replace function public.set_reserva_cancelamento()
returns trigger as $$
begin
  if new.status = 'cancelada' and old.status <> 'cancelada' then
    new.cancelado_em := now();
    new.cancelado_por := auth.uid();
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger reservas_set_cancelamento
  before update on reservas
  for each row execute function public.set_reserva_cancelamento();

-- ============================================================
-- RLS
-- ============================================================

alter table empresas enable row level security;
alter table perfis enable row level security;
alter table salas enable row level security;
alter table reservas enable row level security;
alter table google_tokens enable row level security;

create policy "empresas: leitura autenticada" on empresas
  for select using (auth.role() = 'authenticated');

create policy "perfis: leitura autenticada" on perfis
  for select using (auth.role() = 'authenticated');
create policy "perfis: usuario atualiza o proprio" on perfis
  for update using (auth.uid() = id);

create policy "salas: leitura autenticada" on salas
  for select using (auth.role() = 'authenticated');
create policy "salas: admin escreve" on salas
  for all using (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  ) with check (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );

create policy "reservas: leitura autenticada" on reservas
  for select using (auth.role() = 'authenticated');
create policy "reservas: insert proprio" on reservas
  for insert with check (auth.uid() = usuario_id);
create policy "reservas: update dono ou admin" on reservas
  for update using (
    auth.uid() = usuario_id or exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );
create policy "reservas: delete dono ou admin" on reservas
  for delete using (
    auth.uid() = usuario_id or exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );

-- google_tokens: nenhuma policy de select/insert/update para authenticated —
-- só o service role (usado pelas Edge Functions) acessa esta tabela.
