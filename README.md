# Drish Malhotra — Portfolio

A responsive portfolio for a senior frontend engineer, built with React 19,
TypeScript, Vite, and Tailwind CSS 4. It presents professional experience,
skills, project case studies, theme and accent controls, and an EmailJS-powered
contact form.

## Local development

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

The development server prints its local URL when it starts.

## Environment variables

Copy `.env.example` to `.env` and supply the public EmailJS identifiers for the
contact form:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Do not commit real environment values. If these variables are unavailable, the
site remains usable and the contact form displays an unavailable message.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

Before shipping visual changes, manually check mobile and desktop navigation,
keyboard interaction, all theme/accent combinations, reduced-motion behavior,
project links, resume download, and contact-form validation.

## Project structure

- `src/pages/` — route-level pages
- `src/components/` — portfolio sections and reusable UI
- `src/context/` — theme state and persistence
- `src/index.css` — Tailwind theme tokens, utilities, and global styles
- `public/projects/` — project screenshots

Production output is generated in `dist/` and is not committed.
