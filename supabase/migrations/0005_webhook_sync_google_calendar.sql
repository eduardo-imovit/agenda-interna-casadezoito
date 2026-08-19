create extension if not exists pg_net with schema extensions;

-- Dispara sync-google-calendar a cada INSERT/UPDATE/DELETE em reservas.
-- ATENÇÃO: o valor real de x-webhook-secret NÃO fica neste arquivo (não deve ir
-- pro histórico do git). Ele foi aplicado direto no banco via apply_migration e
-- precisa bater com o secret WEBHOOK_SECRET configurado na Edge Function
-- sync-google-calendar (Supabase Dashboard → Edge Functions → Secrets).
create or replace function public.disparar_sync_google_calendar()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://igvpiakllfhvhhekpjkt.supabase.co/functions/v1/sync-google-calendar',
    body := jsonb_build_object(
      'type', tg_op,
      'table', tg_table_name,
      'record', case when tg_op = 'DELETE' then null else to_jsonb(new) end,
      'old_record', case when tg_op = 'INSERT' then null else to_jsonb(old) end
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', '<< SUBSTITUA PELO VALOR REAL AO REAPLICAR EM OUTRO AMBIENTE >>'
    ),
    timeout_milliseconds := 5000
  );
  return coalesce(new, old);
end;
$$ language plpgsql security definer set search_path = public;

create trigger reservas_sync_google_calendar
after insert or update or delete on public.reservas
for each row execute function public.disparar_sync_google_calendar();
