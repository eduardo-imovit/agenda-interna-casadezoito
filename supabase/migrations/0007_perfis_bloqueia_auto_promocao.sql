-- A policy "perfis: usuario atualiza o proprio" (0001) tinha using(auth.uid() = id)
-- sem with check, então o with check herdado era o mesmo using — ou seja, qualquer
-- usuário podia se auto-promover a admin (ou trocar de empresa) via update direto,
-- sem passar pela UI. Recria a policy restringindo role/empresa_id ao valor atual;
-- só a policy "perfis: admin atualiza qualquer" (0003) pode alterar esses campos.
drop policy if exists "perfis: usuario atualiza o proprio" on perfis;

create policy "perfis: usuario atualiza o proprio" on perfis
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select p.role from perfis p where p.id = auth.uid())
    and empresa_id is not distinct from (select p.empresa_id from perfis p where p.id = auth.uid())
  );
