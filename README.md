# Student Resource Hub

A small web app for students: browse curated study links by category (mathematics, science, computing, cloud, general learning) and search Wikipedia live from the same page.

Built for the Cloud Computing course (Prohor Muchev, ID 11281) and hosted on **Azure Static Web Apps** (Free plan), deployed automatically from GitHub with GitHub Actions.

## Features

- Curated resources with category filters and instant keyword search
- Live Wikipedia search (public MediaWiki API, no key required)
- Favorites saved in the browser (localStorage)
- Strict security headers configured in `staticwebapp.config.json`

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Styling |
| `resources.js` | Curated resource list (edit this to add links) |
| `app.js` | Filtering, favorites and Wikipedia search |
| `staticwebapp.config.json` | Azure Static Web Apps security headers |

## Run locally

No build step is needed. From this folder:

```
python -m http.server 8080
```

Then open http://127.0.0.1:8080.

## Deploy

Azure Static Web Apps: app location `/`, no API, no build output folder. Every push to `main` redeploys the site.
