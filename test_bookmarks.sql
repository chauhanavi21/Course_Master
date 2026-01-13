-- Test if the bookmarks table and foreign key relationship are working
-- This should show the table structure and any existing data

SELECT * FROM public.bookmarks LIMIT 5;

-- Also check if the foreign key relationship works by testing a join
SELECT b.id, b.user_id, c.name, c.subject 
FROM public.bookmarks b
JOIN public.companions c ON b.companion_id = c.id
LIMIT 5;
