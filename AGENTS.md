# Repository Guidelines

## Project Structure & Module Organization

This is a Vite, React, and TypeScript portfolio app. Application code lives in `src/`, with route-level views in `src/pages/`, reusable UI in `src/components/`, and theme state in `src/context/`. Global styling, Tailwind theme tokens, and custom utilities are defined in `src/index.css`. Static project images are stored in `public/projects/`. Build output goes to `dist/` and should not be edited directly.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Vite development server with hot module replacement.
- `npm run build` runs TypeScript project checks with `tsc -b` and creates a production build with Vite.
- `npm run lint` runs ESLint across the repository.
- `npm run preview` serves the latest production build locally for final review.

Run `npm run build` and `npm run lint` before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Component files use PascalCase, such as `HeroSection.tsx` and `ThemeToggle.tsx`; hooks use camelCase with a `use` prefix, such as `useTheme.tsx`. Keep route components in `src/pages/` and shared visual sections in `src/components/`.

Follow the existing two-space indentation, double-quoted imports, semicolons, and Tailwind-first styling approach. Prefer existing CSS variables and utilities in `src/index.css` before adding new colors or repeated class patterns. Use `lucide-react` for icons when an appropriate icon exists.

## Testing Guidelines

No automated test framework is currently configured. For now, validate changes with `npm run lint`, `npm run build`, and a manual browser pass through the home page, theme toggle, navigation links, project cards, and contact form behavior. If tests are added later, place component tests near the component or under a dedicated `src/__tests__/` directory and use descriptive names such as `ThemeToggle.test.tsx`.

## Commit & Pull Request Guidelines

Recent commits use short, direct messages such as `Default to dark mode`, `build fix`, and `contact email js integrated`. Keep commit messages concise and action-oriented.

Pull requests should include a brief summary, screenshots or screen recordings for visual changes, notes about manual checks performed, and any relevant issue or task link. Call out environment or configuration changes, especially updates involving EmailJS or `.env` values.

## Security & Configuration Tips

Keep secrets in `.env` and never commit real credentials. When adding configuration, document required variable names and provide safe example values in documentation rather than in source files.
