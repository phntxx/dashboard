import themeData from './components/data/themes.json';

export const selectedTheme = localStorage.getItem('theme')
    ? JSON.parse(localStorage.getItem('theme'))
    : themeData.themes[0];
