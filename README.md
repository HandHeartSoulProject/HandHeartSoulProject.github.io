# Hand, Heart, and Soul Project

This repository was created using [vite](https://vitejs.dev/guide/) with the react-ts template

## How to run the repository locally
1. If not already installed, install node: [https://nodejs.dev/en/download/](https://nodejs.dev/en/download/)
1. Install pnpm globally: `npm install -g pnpm`
2. Clone the repository onto your computer
3. Navigate into the folder: `cd Hand-Heart-and-Soul`
4. Install dependencies: `pnpm install`
5. Start the development server: `pnpm dev`

## How to [generate types](https://supabase.com/docs/guides/api/generating-types)
1. Log in to the supabase CLI: `npx supabase login`
2. Generate the types: `pnpm gen`

## Running Production build of repository
1. Run pnpm build to create a build
2. Run npx serve -s dist to run the build
