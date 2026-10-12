# Punjapol Portfolio

A standalone, read-only portfolio featuring interactive 3D visuals, StudyMatch, Hydroponic Farm, Tohwang, a line-following robot, education and an embedded AWS program certificate.

## Local preview

Open `dist/index.html` directly, or run `node server.cjs` and visit `http://127.0.0.1:5173`.

## Production build

Run `node scripts/build.mjs`. The script validates inline JavaScript, anchor targets and read-only controls, then copies the standalone page into `site/index.html`. Only this generated directory is published; legacy files and local drafts are excluded from the deployed website.

## Vercel

Import this GitHub repository into Vercel with the repository root as Root Directory. `vercel.json` configures a framework-free build and the `site` output directory. No dependencies or environment variables are required.

Project imagery is clearly labeled as concept illustration. Animation supports pause controls and reduced-motion preferences. Browser visual QA was not available in the authoring session.
