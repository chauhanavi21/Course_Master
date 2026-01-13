-- Correct fix: Keep UUID types and just add the foreign key relationship
-- This assumes your companions table uses UUID for id (which it does based on the schema)

-- First, make sure bookmarks.companion_id is UUID type (it should be already)
-- If you ran the previous script that changed it to TEXT, this will change it back
ALTER TABLE public.bookmarks ALTER COLUMN companion_id TYPE UUID USING companion_id::UUID;

-- Now add the foreign key constraint
ALTER TABLE public.bookmarks 
ADD CONSTRAINT fk_bookmarks_companion_id 
FOREIGN KEY (companion_id) 
REFERENCES public.companions(id) 
ON DELETE CASCADE;

