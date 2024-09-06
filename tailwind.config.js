/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        word: "0 0 0 4px rgba(var(--surface-light))",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        background: "rgba(var(--bg-color))",
        backdrop: "rgba(var(--backdrop-color))",
        copy: "rgba(var(--copy-color))",
        accent: "rgba(var(--accent-color))",
        "surface-light": "rgba(var(--surface-light))",
      },
      fontSize: {
        "book-fs": "var(--book-font-size)",
      },
      height: {
        toolbox: "var(--toolbox-width)",
      },
      maxHeight: {
        "full-screen": "100vh",
      },
      maxWidth: {
        "full-screen": "100vw",
        "toolbox-wrapper":
          "calc(var(--text-max-width) + (var(--toolbox-width) * 2) + 10rem)",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0, 1, 0, 1)",
      },
      width: {
        toolbox: "var(--toolbox-width)",
      },
    },
  },
  plugins: [],
};
