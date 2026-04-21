# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React 19 landing page written in TypeScript. Application code lives in `src/`: `main.tsx` mounts the app, `App.tsx` composes the page, and reusable sections/effects live in `src/components/`. Global Tailwind CSS v4 theme tokens and shared styles are in `src/index.css`. Static imagery is stored in `public/images/`, and image utilities live in `scripts/`. Root configuration includes `vite.config.ts`, `tsconfig.json`, `package.json`, and `index.html`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start Vite on `0.0.0.0:3000` for local development.
- `npm run build`: create the production bundle in `dist/`.
- `npm run preview`: serve the built bundle for a production-style check.
- `npm run lint`: run `tsc --noEmit`; this is the current type and lint gate.
- `npm run clean`: remove `dist/`.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and named component exports. Name components in PascalCase, for example `HeroTransformation.tsx`; use camelCase for variables, hook state, and helpers. Keep imports grouped by external packages first, then local modules. Follow the existing JSX style: two-space indentation, double quotes in TS/TSX imports, and Tailwind utility classes inline. Add CSS only for global tokens, reusable effects, or browser-level behavior.

## Testing Guidelines

No unit or end-to-end test framework is configured in this checkout. Before handing off changes, run `npm run lint` and `npm run build`. For UI work, inspect the Vite dev server at desktop and mobile widths, especially animation timing, image loading, cursor behavior, and text overlap. If tests are added later, place them near covered code or under `tests/` and document the command here.

## Commit & Pull Request Guidelines

This directory does not include Git history, so no project-specific commit convention can be inferred. Use short, imperative commit subjects such as `Add gallery image sequence` or `Fix mobile CTA spacing`. Pull requests should include a concise summary, screenshots or short recordings for visual changes, the commands run (`npm run lint`, `npm run build`), and any environment or asset changes.

## Security & Configuration Tips

Store `GEMINI_API_KEY` in `.env.local`; do not commit local environment files or secrets. `vite.config.ts` exposes the key through `process.env.GEMINI_API_KEY`, so review client-side usage before adding new API calls. Keep large generated media in `public/images/` only when it is required by the landing page.
