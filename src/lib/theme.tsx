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

export const setTheme = (theme: string) => {
  if (theme !== undefined) localStorage.setItem("theme", theme);
  window.location.reload();
};

const getTheme = () => {
  let selectedTheme = defaultTheme;

  if (localStorage.getItem("theme") != null) {
    selectedTheme = JSON.parse(localStorage.getItem("theme") || "{}");
  }

  return selectedTheme;
};

const selectedTheme = getTheme();
export default selectedTheme;
