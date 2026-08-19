-- Admin pode alterar o papel (e empresa) de qualquer usuário.
create policy "perfis: admin atualiza qualquer" on perfis
  for update using (
    exists (select 1 from perfis p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from perfis p where p.id = auth.uid() and p.role = 'admin')
  );

-- Mapa das salas, um por empresa.
alter table empresas add column if not exists mapa_url text;

create policy "empresas: admin escreve" on empresas
  for update using (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  ) with check (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );

-- Bucket público de leitura pro mapa; só admin escreve/apaga.
insert into storage.buckets (id, name, public)
values ('mapas', 'mapas', true)
on conflict (id) do nothing;

create policy "mapas: leitura publica" on storage.objects
  for select using (bucket_id = 'mapas');

create policy "mapas: admin insere" on storage.objects
  for insert with check (
    bucket_id = 'mapas' and exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );

create policy "mapas: admin atualiza" on storage.objects
  for update using (
    bucket_id = 'mapas' and exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );

create policy "mapas: admin deleta" on storage.objects
  for delete using (
    bucket_id = 'mapas' and exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  );
