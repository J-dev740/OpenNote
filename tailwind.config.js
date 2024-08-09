/** @type {import('tailwindcss').Config} */
export const content = ['./src/renderer/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {},
};
export const plugins = [
  require('@tailwindcss/typography')
];

