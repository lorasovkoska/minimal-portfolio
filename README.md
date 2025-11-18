# Minimal Portfolio

My personal portfolio site. Clean, black and white, minimal animations.

## Tech

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Sanity CMS (optional)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

That's it. Everything works with placeholder data by default.

## Adding Sanity CMS (Optional)

If you want to manage your projects/content from a CMS:

1. Create a Sanity project at [sanity.io](https://www.sanity.io/manage)
2. Copy your project ID
3. Add it to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Deploy Sanity Studio:

```bash
npm run sanity:deploy
```

5. Add content at http://localhost:3000/studio or your deployed studio URL

Restart your dev server and you're good. Content updates show up in about a minute.

## Deploy

```bash
npm run build
npm start
```

Push to GitHub and deploy on Vercel. Add the Sanity env variables if you're using it.


## Scripts

```bash
npm run dev              # Dev server
npm run build            # Production build
npm start                # Production server
npm run lint             # ESLint
npm run sanity:deploy    # Deploy Sanity Studio
```

---

Made with ❤️ by Lora
