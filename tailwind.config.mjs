/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All greens — this is a GREEN themed site
        primary: "#3D5938",        // Dark olive green (headings/buttons)
        "primary-dark": "#2D4329", // Deeper green for hover
        sage: "#B5C5A8",           // Soft sage green decoration
        "sage-light": "#D4DDC8",   // Pale sage
        "sage-dark": "#9CAE8E",    // Deeper sage for leaves
        cream: "#E8EDE0",          // Greenish cream background (NOT beige!)
        "cream-light": "#F0F3E8",  // Lighter greenish cream
        warm: "#6B7565",           // Olive-gray body text
        muted: "#8A9580",          // Sage-gray label text
      },
      boxShadow: {
        soft: "0 4px 20px rgba(61, 89, 56, 0.08)",
        button: "0 4px 14px rgba(61, 89, 56, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;