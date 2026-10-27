# Alan Di Geronimo

Source code for my personal website: static HTML, CSS, and JavaScript with no build step, deployed on Cloudflare Workers.

**Live site:** [alandigeronimo.com](https://alandigeronimo.com/)

## Pages

- **Home**: brief bio and what I'm into right now
- **Work**: experience, deals, and projects
- **Journey**: travel photos and an interactive map
- **Contact**: postcard form and direct links

## Structure

```
.
├── index.html          # Home
├── work.html
├── journey.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── index.js        # Home page
│   ├── work.js         # Work page
│   ├── journey.js      # Photo gallery
│   ├── map.js          # Travel map (Journey only)
│   └── contact.js      # Postcard form
├── assets/             # Images, data, documents, vendor libraries
├── wrangler.jsonc      # Cloudflare Workers config
└── README.md
```

Page URLs stay at the project root (`index.html`, `work.html`, and so on).

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy

The site is served as static assets on Cloudflare Workers, configured in `wrangler.jsonc`.

```bash
npx wrangler login   # first time only
npx wrangler deploy
```

## Built with

HTML, CSS, and JavaScript. Hosted on Cloudflare Workers. Built with [Cursor](https://cursor.com/).
