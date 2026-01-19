-- Add language column to companions table
-- This migration adds support for storing the language preference for each companion

-- Step 1: Add language column (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'companions' 
        AND column_name = 'language'
    ) THEN
        ALTER TABLE public.companions 
        ADD COLUMN language TEXT DEFAULT 'english';
        
        -- Update existing records to have default language
        UPDATE public.companions 
        SET language = 'english' 
        WHERE language IS NULL;
        
        RAISE NOTICE 'Added language column to companions table';
    ELSE
        RAISE NOTICE 'language column already exists in companions table';
    END IF;
END $$;

-- Note: After running this migration, the language field will be stored in the database
-- Default value is 'english' for backward compatibility
