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
 * Writes a given theme into localStorage
 * @param {string} theme - the theme that shall be saved (in stringified JSON)
 */
export const setTheme = (theme: IThemeProps) => {
  localStorage.setItem("theme", JSON.stringify(theme));
  window.location.reload();
};

/**
 * Function that gets the saved theme from localStorage or returns the default
 * @returns {IThemeProps} the saved theme or the default theme
 */
export const getTheme = (): IThemeProps => {
  let selectedTheme = defaultTheme;

  let theme = localStorage.getItem("theme");
  if (theme !== null) selectedTheme = JSON.parse(theme || "{}");

  return selectedTheme;
};

const selectedTheme = getTheme();
export default selectedTheme;
