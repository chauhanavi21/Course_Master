# Database Migration Guide - Fix UUID to TEXT for Clerk User IDs

## Problem
Clerk user IDs are strings like `"user_34hFuCmOzJG2C8AXOFz0ds9VXxG"`, but the database columns are set to UUID type, causing errors:
```
Error: invalid input syntax for type uuid: "user_34hFuCmOzJG2C8AXOFz0ds9VXxG"
```

## Solution
Change all user ID columns from UUID to TEXT to support Clerk's string-based user IDs.

## Steps to Fix

### Step 1: Check Current Database State
1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Run `check_database_issues.sql` to see:
   - Current column types
   - Foreign key constraints
   - RLS policies
   - Existing data format

### Step 2: Run the Migration
1. In Supabase SQL Editor, run `fix_author_column_type.sql`
2. This will safely convert:
   - `companions.author` → UUID to TEXT
   - `bookmarks.user_id` → UUID to TEXT (if exists)
   - `session_history.user_id` → UUID to TEXT (if exists)

### Step 3: Verify the Migration
1. Run `check_database_issues.sql` again
2. Verify all columns are now TEXT type
3. Check that existing data is preserved

### Step 4: Test the Application
1. Try creating a new companion
2. Try deleting a companion
3. Check browser console for any errors

## What Gets Changed

### Tables Affected:
- **companions.author** - Stores who created the companion
- **bookmarks.user_id** - Stores which user bookmarked a companion
- **session_history.user_id** - Stores which user had a session

### Safety Features:
- ✅ Migration is idempotent (safe to run multiple times)
- ✅ Checks column type before altering
- ✅ Preserves existing data using `USING author::TEXT`
- ✅ Handles missing columns gracefully

## Troubleshooting

### If migration fails:
1. Check if you have proper permissions in Supabase
2. Verify tables exist
3. Check for active connections blocking the migration

### If errors persist after migration:
1. Check RLS (Row Level Security) policies
2. Verify foreign key constraints allow deletes
3. Check browser console for specific error messages
4. Review `lib/actions/companion.actions.ts` error handling

## Rollback (if needed)
If you need to rollback, you would need to:
1. Convert TEXT back to UUID (but this will fail if Clerk IDs are stored)
2. This is not recommended as Clerk IDs cannot be converted to UUIDs

## Notes
- After migration, all new companions will store Clerk user IDs as TEXT
- Existing data is preserved during migration
- No data loss occurs during this migration
