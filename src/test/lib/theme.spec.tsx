import selectedTheme, {
  getTheme,
  IThemeProps,
  setTheme,
} from "../../lib/theme";

const props: IThemeProps = {
  label: "Classic",
  value: 0,
  mainColor: "#000000",
  accentColor: "#1e272e",
  backgroundColor: "#ffffff",
};

const theme = JSON.stringify(props);

describe("theme.tsx", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("setTheme test", () => {
    setTheme(theme);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", theme);
  });

  it("getTheme test", () => {
    const themeTest = getTheme();
    expect(themeTest).toEqual(props);
  });

  it("selectedTheme test", () => {
    const themeTest = selectedTheme;
    expect(themeTest).toEqual(props);
  });
});
