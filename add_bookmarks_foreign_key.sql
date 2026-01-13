-- Add foreign key relationship between bookmarks and companions tables
-- This enables the companions:companion_id (*) syntax in Supabase queries

ALTER TABLE public.bookmarks 
ADD CONSTRAINT fk_bookmarks_companion_id 
FOREIGN KEY (companion_id) 
REFERENCES public.companions(id) 
ON DELETE CASCADE;

