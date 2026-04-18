-- Run this once in Supabase SQL Editor to enable the hole-by-hole strategy notes.
create table if not exists course_notes (
  course_id text not null,
  hole_number int not null,
  strategy text,
  updated_at timestamptz not null default now(),
  primary key (course_id, hole_number)
);

alter table course_notes enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename='course_notes' and policyname='anon_all') then
    create policy anon_all on course_notes for all using (true) with check (true);
  end if;
end $$;
