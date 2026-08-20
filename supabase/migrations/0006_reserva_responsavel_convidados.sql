alter table reservas add column if not exists responsavel text;
alter table reservas add column if not exists convidados text[] not null default '{}';
