import { getTheme, IThemeProps, setTheme } from "../../lib/theme";

const props: IThemeProps = {
  label: "Classic",
  value: 0,
  mainColor: "#000000",
  accentColor: "#1e272e",
  backgroundColor: "#ffffff",
};

const location: Location = window.location;
const setup = () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => JSON.stringify(props)),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  // @ts-ignore
  delete window.location;

  window.location = {
    ...location,
    reload: jest.fn(),
  };
};

describe("theme.tsx", () => {
  it("setTheme light test", () => {
    setup();

    setTheme("light", props);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "light-theme",
      JSON.stringify(props),
    );
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("setTheme dark test", () => {
    setup();

    setTheme("dark", props);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "dark-theme",
      JSON.stringify(props),
    );
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("Tests getTheme", () => {
    setup();

    let themeTest = getTheme();
    expect(themeTest).toEqual(props);
  });

  it("Tests getTheme with empty parameters", () => {
    localStorage.setItem("theme", "");
    expect(getTheme()).toEqual({});
  });
});
