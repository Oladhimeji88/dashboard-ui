export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#F2F1EF',
        panel: '#EAE9E5',
        panelSoft: '#EFEEEB',
        ink: '#17171A',
        inkSoft: '#3D3D3F',
        muted: '#8B8B85',
        line: '#DEDCD6',
        accent: '#FBD24E',
        accentSoft: '#FBEDB4',
        up: '#3FA46A',
        down: '#E05C3E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '28px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
