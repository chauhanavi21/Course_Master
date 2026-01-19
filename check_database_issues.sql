-- Database Health Check Script
-- Run this to check for potential issues before/after migration

-- 1. Check current column types
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
    AND (
        (table_name = 'companions' AND column_name = 'author')
        OR (table_name = 'bookmarks' AND column_name = 'user_id')
        OR (table_name = 'session_history' AND column_name = 'user_id')
    )
ORDER BY table_name, column_name;

-- 2. Check for foreign key constraints
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
JOIN information_schema.referential_constraints AS rc
    ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
    AND (
        tc.table_name IN ('companions', 'bookmarks', 'session_history')
        OR ccu.table_name = 'companions'
    )
ORDER BY tc.table_name, kcu.column_name;

-- 3. Check RLS policies (if RLS is enabled)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
    AND tablename IN ('companions', 'bookmarks', 'session_history')
ORDER BY tablename, policyname;

-- 4. Check if RLS is enabled on tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN ('companions', 'bookmarks', 'session_history');

-- 5. Sample data check - see if there are any existing author values
SELECT 
    COUNT(*) as total_companions,
    COUNT(DISTINCT author) as unique_authors,
    COUNT(CASE WHEN author IS NULL THEN 1 END) as null_authors,
    COUNT(CASE WHEN author LIKE 'user_%' THEN 1 END) as clerk_format_authors,
    COUNT(CASE WHEN author ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN 1 END) as uuid_format_authors
FROM companions;
