# Supabase/Svelte Kanban

A [Trello](https://trello.com) clone using [Supabase](https://supabase.io) as the storage system.

## [Live Demo](https://supabase-kanban.vercel.app/)

### Screenshot

![Screenshot](https://github.com/supabase-community/supabase-kanban/blob/main/screenshot.png)

# Setup locally

1. Clone the repo with `gh repo clone supabase-community/supabase-kanban` and install dependencies with `pnpm install`
2. Setup the database on [supabase](https://supabase.io) and run the commands in [`setup.sql`](https://github.com/supabase-community/supabase-kanban/blob/main/setup.sql)
3. Rename `.env.example` to `.env` and update the credentials
4. Start development server with `pnpm dev`
5. Done!

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# License

MIT