-- policy antiga: "reservas: update dono ou admin" liberava admin a alterar
-- QUALQUER coluna de QUALQUER reserva (sem with check, herda o using). A UI
-- ja restringe: dono edita os detalhes, admin so cancela reserva de terceiro.
-- Aqui o banco passa a garantir a mesma regra, pra nao dar pra contornar via
-- chamada direta a API.
drop policy if exists "reservas: update dono ou admin" on reservas;

create policy "reservas: dono atualiza a propria" on reservas
  for update using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);

create policy "reservas: admin so cancela reserva de terceiro" on reservas
  for update using (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from perfis where id = auth.uid() and role = 'admin')
    and sala_id = (select r.sala_id from reservas r where r.id = reservas.id)
    and usuario_id = (select r.usuario_id from reservas r where r.id = reservas.id)
    and empresa_id is not distinct from (select r.empresa_id from reservas r where r.id = reservas.id)
    and titulo = (select r.titulo from reservas r where r.id = reservas.id)
    and responsavel is not distinct from (select r.responsavel from reservas r where r.id = reservas.id)
    and convidados = (select r.convidados from reservas r where r.id = reservas.id)
    and inicio = (select r.inicio from reservas r where r.id = reservas.id)
    and fim = (select r.fim from reservas r where r.id = reservas.id)
    and google_event_id is not distinct from (select r.google_event_id from reservas r where r.id = reservas.id)
  );
