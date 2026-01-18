# CourseMaster - AI Learning Companion Platform

This is a [Next.js](https://nextjs.org) project that enables users to build personalized AI companions and learn any subject through natural, engaging voice conversations.

## Features

- **Create AI Companions**: Build personalized learning companions with custom names, subjects, topics, voices, and personalities
- **Voice Conversations**: Learn through natural voice interactions with AI companions
- **Companion Library**: Browse and discover companions created by the community
- **Delete Companions**: Authors can delete their own companions using the delete button on companion cards
- **Session History**: Track your recent learning sessions
- **Subject Filtering**: Filter companions by subject (Science, Math, Language, History, Coding, Economics, etc.)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages and layouts
  - `companions/` - Companion library and creation pages
  - `companions/[id]/` - Individual companion session pages
- `components/` - React components
  - `CompanionCard.tsx` - Card component for displaying companions with delete functionality
  - `CompanionComponent.tsx` - Main voice conversation component
  - `CompanionForm.tsx` - Form for creating new companions
- `lib/actions/` - Server actions
  - `companion.actions.ts` - Companion CRUD operations and data fetching
- `lib/supabase.ts` - Supabase client configuration
- `types/` - TypeScript type definitions

## Key Features

### Companion Cards
- Display companion information (name, topic, subject, duration)
- Delete button visible only to the companion's author
- Color-coded by subject

### Database
- Uses Supabase for data storage
- Companions are stored with author information for ownership tracking
- Session history tracking for user progress

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Supabase](https://supabase.com) - Database and backend
- [Clerk](https://clerk.com) - Authentication
- [VAPI](https://vapi.ai) - Voice AI integration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
