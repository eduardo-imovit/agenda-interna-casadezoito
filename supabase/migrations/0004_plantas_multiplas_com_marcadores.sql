create table plantas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id),
  nome text not null,
  ordem int not null default 0,
  imagem_url text,
  created_at timestamptz not null default now()
);

alter table salas add column if not exists planta_id uuid references plantas(id) on delete set null;
alter table salas add column if not exists pos_x numeric;
alter table salas add column if not exists pos_y numeric;

alter table empresas drop column if exists mapa_url;

alter table plantas enable row level security;

create policy "plantas: leitura autenticada" on plantas
  for select using (auth.role() = 'authenticated');

create policy "plantas: admin escreve" on plantas
  for all using (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  ) with check (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );
