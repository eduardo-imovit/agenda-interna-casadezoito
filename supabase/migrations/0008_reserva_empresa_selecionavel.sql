-- empresa_id agora vem do formulario (campo Empresa), nao mais herdado do perfil do dono.
drop trigger if exists reservas_set_empresa on reservas;
drop function if exists public.set_reserva_empresa();
