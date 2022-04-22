# Supabase/Svelte Kanban

A [Trello](https://trello.com) clone using [Supabase](https://supabase.io) as the storage system.

## [Live Demo](https://supabase-kanban.vercel.app/)

### Screenshot

![Screenshot](https://github.com/supabase-community/supabase-kanban/blob/master/screenshot.png)

# Setup locally

1. Clone the repo with `gh repo clone supabase-community/supabase-kanban` and install dependencies with `pnpm install`
2. Setup the database on [supabase](https://supabase.io) and run the commands in [`setup.sql`](https://github.com/supabase-community/supabase-kanban/blob/master/setup.sql)
3. Rename `.env.example` to `.env` and update the credentials
4. Start development server with `pnpm dev`
5. Done!

## Available Scripts

### pnpm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### pnpm test

Runs `vitest` on all `*.test.js` files.

### pnpm lint

Runs `eslint` on all files.

### pnpm format

Formats all files according to rules defined in `.eslintrc.js`.

### pnpm build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

### pnpm deploy

Deploys the app to [vercel](https://vercel.com)

# License

MIT
