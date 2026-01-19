-- Fix author column type to support Clerk user IDs
-- Clerk user IDs are strings like "user_34hFuCmOzJG2C8AXOFz0ds9VXxG", not UUIDs
-- This migration changes the author column from UUID to TEXT

-- IMPORTANT: Run check_database_issues.sql first to see current state
-- This migration is safe to run multiple times (idempotent)

-- Step 1: Change companions.author from UUID to TEXT
-- Check if column is UUID type first to avoid errors
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'companions' 
        AND column_name = 'author'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE public.companions 
        ALTER COLUMN author TYPE TEXT USING author::TEXT;
        RAISE NOTICE 'Changed companions.author from UUID to TEXT';
    ELSE
        RAISE NOTICE 'companions.author is already TEXT or does not exist';
    END IF;
END $$;

-- Step 2: Change bookmarks.user_id from UUID to TEXT (if it exists and is UUID)
-- Check if column exists and is UUID type first
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookmarks' 
        AND column_name = 'user_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE public.bookmarks 
        ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
    END IF;
END $$;

-- Step 3: Change session_history.user_id from UUID to TEXT (if it exists and is UUID)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'session_history' 
        AND column_name = 'user_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE public.session_history 
        ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
    END IF;
END $$;

-- Note: After running this migration, all user ID fields will accept Clerk user IDs
-- which are strings in the format "user_xxxxxxxxxxxxx"
