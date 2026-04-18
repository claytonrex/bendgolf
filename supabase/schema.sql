-- Run this once in Supabase SQL editor.
-- Minimal schema: cup matches, solo results, handicaps, house info, trash talk.

create table if not exists cup_results (
  round_id text primary key,
  winner text not null check (winner in ('team1','team2','tie')),
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists solo_results (
  round_id text primary key,
  first text,
  second text,
  third text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists handicaps (
  player_id text primary key,
  handicap numeric
);

create table if not exists house_info (
  id text primary key default 'main',
  address text,
  wifi_ssid text,
  wifi_password text,
  check_in text,
  check_out text,
  door_code text,
  room_assignments text,
  notes text
);

insert into house_info (id) values ('main') on conflict (id) do nothing;

create table if not exists trash_talk (
  id uuid primary key default gen_random_uuid(),
  player_id text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Relaxed RLS: PIN-gated app; treat anon key as shared group key.
alter table cup_results enable row level security;
alter table solo_results enable row level security;
alter table handicaps enable row level security;
alter table house_info enable row level security;
alter table trash_talk enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename='cup_results' and policyname='anon_all') then
    create policy anon_all on cup_results for all using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='solo_results' and policyname='anon_all') then
    create policy anon_all on solo_results for all using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='handicaps' and policyname='anon_all') then
    create policy anon_all on handicaps for all using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='house_info' and policyname='anon_all') then
    create policy anon_all on house_info for all using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='trash_talk' and policyname='anon_all') then
    create policy anon_all on trash_talk for all using (true) with check (true);
  end if;
end $$;
