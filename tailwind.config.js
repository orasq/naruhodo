/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--bg-color))",
        copy: "rgba(var(--copy-color))",
        "surface-light": "rgba(var(--surface-light))",
      },
      boxShadow: {
        word: "0 0 0 4px var(--surface-light)",
      },
      maxWidth: {
        "full-screen": "100vw",
      },
      maxHeight: {
        "full-screen": "100vh",
      },
    },
  },
  plugins: [],
};
