const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    {
      pattern: /grid-cols-(\d+)/, // Safelist grid-cols-{n} classes
    },
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8B06B",
      },
    },
  },
  plugins: [],
};
