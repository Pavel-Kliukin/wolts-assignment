/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'receipt': ['Cutive Mono', 'ui-monospace', 'SFMono-Regular'],
      'wolt_semiBold': ['OmnesLatin-SemiBold', 'ui-serif', 'Georgia'],
      'wolt_Bold': ['OmnesLatin-Bold', 'ui-serif', 'Georgia'],
    },
    extend: {},
  },
  plugins: [],
}