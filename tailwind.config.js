/** @type {import('tailwindcss').Config} */

const { color } = require('framer-motion');
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xl: "1280px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "480px",
      },
    },
    extend: {
      keyframes: {
        'pulse-neon': {
          '0%': {
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff00de, 0 0 82px #ff00de, 0 0 92px #ff00de, 0 0 102px #ff00de, 0 0 151px #ff00de',
          },
          '100%': {
            textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #ff00de, 0 0 51px #ff00de, 0 0 57px #ff00de, 0 0 64px #ff00de, 0 0 95px #ff00de',
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      colors: {
        neonBlue: '#00FFFF', 
        darkBg: '#0A0E1A',  
        neonAccent: '#1E90FF'
      },
      animation: {
        'pulse-neon': 'pulse-neon 1.5s ease-in-out infinite alternate',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      fontFamily: {
        frick: ['Frick', 'sans-serif'],
        frisky: ['Frisky', 'cursive'],
        super: ['Super', 'cursive'],
      },
      backgroundImage: {
        "power1": "url('/gifs/power1.webp')",
        "power2": "url('/gifs/power2.gif')",
        "power3": "url('/gifs/power3.gif')",
        "game-bg": "url('/images/game-bg.jpeg')",
        "game-bg1": "url('/images/game-bg1.jpeg')",
        "title": "url('/images/title.png')",
        "dialogue": "url('/images/dialogue.png')",
        "scroll": "url('/images/scroll.png')",
      }      
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme("colors.scrollbar.track"),
            borderRadius: '100px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme("colors.scrollbar.DEFAULT"),
            borderRadius: '5px',
            border: `2px solid ${theme("colors.scrollbar.track")}`,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme("colors.scrollbar.hover"),
          },
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme("colors.scrollbar.DEFAULT")} ${theme("colors.scrollbar.track")}`,
        },
      });
    }),
  ],
};
