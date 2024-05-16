/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'base': '0px 0px 6px -3px rgba(0,0,0,0.75);',
        'bold': '0px 0px 8px -3px rgba(0,0,0,0.75);',
      },
      fontFamily: {
        body: ["Mukta"]
      }
    },
  },
  plugins: [],
};
