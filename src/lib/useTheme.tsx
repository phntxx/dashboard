import { IItemProps } from "../components/select";

export interface IThemeProps extends IItemProps {
  mainColor: string;
  accentColor: string;
  backgroundColor: string;
}

export const defaultTheme: IThemeProps = {
  label: "Classic",
  value: 0,
  mainColor: "#000000",
  accentColor: "#1e272e",
  backgroundColor: "#ffffff",
};

/**
 * Writes the color scheme into localStorage
 * @param {string} scheme
 */
export const setScheme = (scheme: string) => {
  localStorage.setItem("theme", scheme);
};

/**
 * Writes a given theme into localStorage
 * @param {string} scheme - the color scheme (light or dark) to save the theme to
 * @param {string} theme - the theme that shall be saved (in stringified JSON)
 */
export const setTheme = (scheme: string, theme: IThemeProps) => {
  if (scheme === "light") {
    localStorage.setItem("light-theme", JSON.stringify(theme));
    localStorage.setItem("theme", "light-theme");
  }
  if (scheme === "dark") {
    localStorage.setItem("dark-theme", JSON.stringify(theme));
    localStorage.setItem("theme", "dark-theme");
  }
  window.location.reload();
};

/**
 * Function that gets the saved theme from localStorage or returns the default
 * @param {string} [scheme] the color scheme to retrieve the theme for
 * @returns {IThemeProps} the saved theme or the default theme
 */
export const getTheme = (scheme?: string): IThemeProps => {
  let currentScheme = localStorage.getItem("theme");
  let selectedTheme = defaultTheme;

  if (scheme === "light") {
    currentScheme = "light-theme";
  } else if (scheme === "dark") {
    currentScheme = "dark-theme";
  }

  let theme =
    currentScheme === "dark-theme"
      ? localStorage.getItem("dark-theme")
      : localStorage.getItem("light-theme");
  if (theme !== null) selectedTheme = JSON.parse(theme || "{}");

  return selectedTheme;
};

const selectedTheme = getTheme();
export default selectedTheme;
