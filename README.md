# revops-director-landing
Landing page for Alyvon's RevOps Director — AI-powered revenue operations specialist

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/alyvonai/revops-director-landing.git
   cd revops-director-landing
   ```
2. Run the dev server (no `npm install` needed — there are no installed
   dependencies; `npx` fetches the `serve` package on demand):
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `index.html` — the single-page markup for the landing page.
- `styles.css` — all styling, including brand colors as CSS custom properties on `:root`.
- `package.json` — defines the `dev` script (`npx serve . -l 3000`); no other dependencies.
- `README.md` — this file.

This is a plain static site: just HTML and CSS, no build step, no framework, no bundler.

## Brand

- **Accent:** a single warm orange, `--color-accent` (`#DE4B12`), used sparingly for emphasis.
- **Surfaces:** cool white throughout — `--color-background` (`#FFFFFF`) and `--color-surface-alt` (`#F6F7F9`), with `--color-border` (`#D8D6D7`) and `--color-muted-text` (`#AEA8A8`) for structure and secondary copy.
- **Typeface:** [Archivo](https://fonts.google.com/specimen/Archivo), sans-serif only — loaded via Google Fonts in `index.html`.
