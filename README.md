# Punjapol portfolio

Run `node server.cjs` (or `npm run dev`) and open http://127.0.0.1:5173.

Static website in `dist/`, including a draggable 3D torus rendered with Canvas, responsive layout, project dialogs, reduced-motion support and keyboard navigation. No installation or build is required.

Edit personal content in `dist/index.html`, project descriptions in `dist/app.js`, and design in `dist/style.css`. Project visuals are concept illustrations. Add verified project details and contact links before using this as a public professional profile.

## Add your real content

Edit `dist/content.js` to add portrait and project photo paths, actual contributions, technologies, results, email, GitHub, LinkedIn, project URLs and a resume PDF URL. Put photos under `dist/images/`, for example `images/profile.jpg`. Empty photo paths display designed placeholders; empty links display a non-clickable coming-soon label. Broken photos keep a placeholder. Do not place sensitive documents in the static directory.

The canteen playground is a manual simulation, not an ML inference demo. Clicking a table toggles occupancy. Reset restores four empty tables; clear makes all eight empty. Changes are transient and do not affect real systems.

The additional styles and behavior are in `dist/enhancements.css` and `dist/enhancements.js`.
