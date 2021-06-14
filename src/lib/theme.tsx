export interface IThemeProps {
  label: string;
  value: number;
  mainColor: string;
  accentColor: string;
  backgroundColor: string;
}

const defaultTheme: IThemeProps = {
  label: "Classic",
  value: 0,
  mainColor: "#000000",
  accentColor: "#1e272e",
  backgroundColor: "#ffffff",
};

/**
 * Writes a given theme into localStorage
 * @param {string} theme - the theme that shall be saved (in stringified JSON)
 */
export const setTheme = (theme: string) => {
  if (theme !== undefined) localStorage.setItem("theme", theme);
  window.location.reload();
};

/**
 * Function that gets the saved theme from localStorage or returns the default
 * @returns {IThemeProps} the saved theme or the default theme
 */
export const getTheme = (): IThemeProps => {
  let selectedTheme = defaultTheme;

  if (localStorage.getItem("theme") !== null) {
    selectedTheme = JSON.parse(localStorage.getItem("theme") || "{}");
  }

  return selectedTheme;
};

const selectedTheme = getTheme();
export default selectedTheme;
