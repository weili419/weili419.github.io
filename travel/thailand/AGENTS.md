# Thailand guide maintenance

This directory is the canonical source and published output. Edit `_source`; do not copy over it from the old desktop project.
Generate `index.html`, `map.html`, and `assets` with `npm run publish-files` inside `_source`.
Do not commit node_modules, dist, local env files, or runtime logs.
Preserve stable restaurant F1–F40 and hotel H1–H9 IDs. Generic meal suggestions must not get fabricated restaurant coordinates.
Keep plans, map, meals, hotel dates, night counts, and budgets consistent. Date key 1001 means October 1.
Current authorization is GitHub Pages publishing; do not deploy a second Sites project.
Validate with typecheck, scripts/check-plans.mjs, static export, and the repository Jekyll build before a scoped commit and push.
