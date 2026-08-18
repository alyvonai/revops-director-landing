import type { Config } from "tailwindcss";

// Brand tokens — ratified Alyvon design canon. Do not derive these ad hoc;
// this file is the single source of truth for every page/component.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#DE4B12", // primary CTA / accent
        background: "#FFFFFF",
        border: "#D8D6D7",
        muted: "#AEA8A8", // muted text
        surface: "#F6F7F9", // section surface
        rust: "#815445", // secondary rust/orange accent
        altsurface: "#EEEEEF", // alternate surface gray
        ink: "#17151A", // near-black for body copy (not a brand token; derived for AA contrast on white)
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "0.875rem",
      },
      maxWidth: {
        container: "72rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(23, 21, 26, 0.04), 0 1px 8px 0 rgba(23, 21, 26, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
