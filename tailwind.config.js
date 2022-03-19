module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          400: "#292929",
          500: "#210b2c",
          600: "#292929",
        },
      },
      fontFamily: {
        serif: ["Maitree", "serif"],
        sans: ["Roboto", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1140px",
          xl: "1140px",
          "2xl": "1350px",
        },
      },
    },
  },
  plugins: [],
};
