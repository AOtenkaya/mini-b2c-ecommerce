module.exports = {
  darkMode: "class", // Enables class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust based on your project
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FF8C00", // Your primary orange
          dark: "#FF7F00",
        },
      },
    },
  },
  plugins: [],
};
