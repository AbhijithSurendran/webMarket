-- =============================================
-- WebMarket CMS — Initial Schema Migration
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- Profiles (extends auth.users)
-- =============================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- Hero Sliders
-- =============================================
create table if not exists public.hero_sliders (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  title text not null,
  description text,
  button_text text,
  button_link text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Pages (About, etc.)
-- =============================================
create table if not exists public.pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  banner_image text,
  content jsonb not null default '{}',
  meta_title text,
  meta_description text,
  updated_at timestamptz not null default now()
);

-- =============================================
-- Services
-- =============================================
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  description text,
  content text,
  image_url text,
  meta_title text,
  meta_description text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Products
-- =============================================
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  description text,
  content text,
  image_url text,
  meta_title text,
  meta_description text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Gallery
-- =============================================
create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Blogs
-- =============================================
create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  author text,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Testimonials
-- =============================================
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  designation text,
  message text not null,
  photo_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================
-- Enquiries
-- =============================================
create table if not exists public.enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text not null,
  location text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- =============================================
-- Site Settings (key-value pairs)
-- =============================================
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value text,
  updated_at timestamptz not null default now()
);

-- Default site settings
insert into public.site_settings (key, value) values
  ('site_name', 'WebMarket'),
  ('logo_url', ''),
  ('footer_text', '© 2024 WebMarket. All rights reserved.'),
  ('footer_description', 'Your trusted partner for quality products and services.'),
  ('address', '123 Business Street, City, State 12345'),
  ('phone', '+1 (555) 000-0000'),
  ('email', 'info@webmarket.com'),
  ('google_maps_embed', ''),
  ('facebook_url', ''),
  ('twitter_url', ''),
  ('instagram_url', ''),
  ('linkedin_url', ''),
  ('meta_title', 'WebMarket — Quality Products & Services'),
  ('meta_description', 'Discover our wide range of products and services. Professional solutions for your needs.')
on conflict (key) do nothing;

-- =============================================
-- Updated_at trigger function
-- =============================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at triggers
create trigger set_hero_sliders_updated_at before update on public.hero_sliders
  for each row execute function public.set_updated_at();
create trigger set_pages_updated_at before update on public.pages
  for each row execute function public.set_updated_at();
create trigger set_services_updated_at before update on public.services
  for each row execute function public.set_updated_at();
create trigger set_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();
create trigger set_gallery_updated_at before update on public.gallery
  for each row execute function public.set_updated_at();
create trigger set_blogs_updated_at before update on public.blogs
  for each row execute function public.set_updated_at();
create trigger set_testimonials_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();
create trigger set_site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- =============================================
-- Row Level Security (RLS)
-- =============================================
alter table public.profiles enable row level security;
alter table public.hero_sliders enable row level security;
alter table public.pages enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.gallery enable row level security;
alter table public.blogs enable row level security;
alter table public.testimonials enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;

-- Helper function: is admin
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Profiles: users see own, admins see all
create policy "Users can view own profile" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "Admins can update profiles" on public.profiles
  for update using (public.is_admin());

-- Hero sliders: public read, admin write
create policy "Public can view active sliders" on public.hero_sliders
  for select using (is_active = true or public.is_admin());
create policy "Admins can manage sliders" on public.hero_sliders
  for all using (public.is_admin());

-- Pages: public read, admin write
create policy "Public can read pages" on public.pages
  for select using (true);
create policy "Admins can manage pages" on public.pages
  for all using (public.is_admin());

-- Services: public read published, admin all
create policy "Public can read published services" on public.services
  for select using (is_published = true or public.is_admin());
create policy "Admins can manage services" on public.services
  for all using (public.is_admin());

-- Products: public read published, admin all
create policy "Public can read published products" on public.products
  for select using (is_published = true or public.is_admin());
create policy "Admins can manage products" on public.products
  for all using (public.is_admin());

-- Gallery: public read active, admin all
create policy "Public can view active gallery" on public.gallery
  for select using (is_active = true or public.is_admin());
create policy "Admins can manage gallery" on public.gallery
  for all using (public.is_admin());

-- Blogs: public read published, admin all
create policy "Public can read published blogs" on public.blogs
  for select using (is_published = true or public.is_admin());
create policy "Admins can manage blogs" on public.blogs
  for all using (public.is_admin());

-- Testimonials: public read active, admin all
create policy "Public can view active testimonials" on public.testimonials
  for select using (is_active = true or public.is_admin());
create policy "Admins can manage testimonials" on public.testimonials
  for all using (public.is_admin());

-- Enquiries: anyone can insert, only admin can read/delete
create policy "Anyone can submit enquiry" on public.enquiries
  for insert with check (true);
create policy "Admins can read enquiries" on public.enquiries
  for select using (public.is_admin());
create policy "Admins can delete enquiries" on public.enquiries
  for delete using (public.is_admin());
create policy "Admins can update enquiries" on public.enquiries
  for update using (public.is_admin());

-- Site settings: public read, admin write
create policy "Public can read site settings" on public.site_settings
  for select using (true);
create policy "Admins can manage settings" on public.site_settings
  for all using (public.is_admin());

-- =============================================
-- Storage Buckets
-- =============================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public can view media" on storage.objects
  for select using (bucket_id = 'media');
create policy "Admins can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());
create policy "Admins can delete media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
