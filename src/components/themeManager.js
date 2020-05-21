import themeData from "./data/themes.json";

const setTheme = theme => {
  localStorage.setItem("theme", theme);
  window.location.reload();
};

const resetTheme = () => {
  localStorage.removeItem("theme");
};

const getTheme = () => {
  let selectedTheme = themeData.themes[0];

  if (
    localStorage.getItem("theme") &&
    localStorage.getItem("theme") !== undefined
  ) {
    selectedTheme = JSON.parse(localStorage.getItem("theme"));
  }

  return selectedTheme;
};

const selectedTheme = getTheme();

export { setTheme, resetTheme };

export default selectedTheme;
