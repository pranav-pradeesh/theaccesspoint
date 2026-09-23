-- Project briefs submitted from /contact.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  project_type text not null,
  budget text not null,
  timeline text not null,
  description text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Leads are written server-side with the service-role key only.
-- RLS on with no policies = no access for anon/authenticated clients.
alter table public.leads enable row level security;
