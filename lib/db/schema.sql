-- Run this in your Supabase SQL editor

create table if not exists audits (
  id text primary key,
  created_at timestamptz default now() not null,
  tool_results jsonb not null,
  total_monthly_spend numeric not null,
  total_monthly_savings numeric not null,
  total_annual_savings numeric not null,
  ai_summary text,
  email text,
  company text,
  role text
);

-- Index for lead lookups
create index if not exists audits_email_idx on audits (email);

-- Enable Row Level Security
alter table audits enable row level security;

-- Allow anonymous inserts (audit submissions)
create policy "Allow anonymous insert" on audits
  for insert with check (true);

-- Allow public read by ID (shareable links)
create policy "Allow public read by id" on audits
  for select using (true);

-- Allow updates (for AI summary + lead capture after creation)
create policy "Allow anonymous update" on audits
  for update using (true);
