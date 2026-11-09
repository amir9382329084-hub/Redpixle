-- REDPIXEL portfolio image storage
-- Run this once in Supabase SQL Editor.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view REDPIXEL portfolio images" on storage.objects;
create policy "Public can view REDPIXEL portfolio images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio');

drop policy if exists "REDPIXEL owner can upload portfolio images" on storage.objects;
create policy "REDPIXEL owner can upload portfolio images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio'
  and (select auth.uid()) = '623dbea3-b569-4b5b-ba93-16c5a431553f'::uuid
);

drop policy if exists "REDPIXEL owner can update portfolio images" on storage.objects;
create policy "REDPIXEL owner can update portfolio images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio'
  and (select auth.uid()) = '623dbea3-b569-4b5b-ba93-16c5a431553f'::uuid
)
with check (
  bucket_id = 'portfolio'
  and (select auth.uid()) = '623dbea3-b569-4b5b-ba93-16c5a431553f'::uuid
);

drop policy if exists "REDPIXEL owner can delete portfolio images" on storage.objects;
create policy "REDPIXEL owner can delete portfolio images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio'
  and (select auth.uid()) = '623dbea3-b569-4b5b-ba93-16c5a431553f'::uuid
);
