import { render } from "@testing-library/react";
import App, { GlobalStyle } from "../app";
import { IThemeProps } from "../lib/useTheme";

const props: IThemeProps = {
  label: "Classic",
  value: 0,
  mainColor: "#000000",
  accentColor: "#1e272e",
  backgroundColor: "#ffffff",
};

describe("app.tsx", () => {
  it("Tests GlobalStyle", () => {
    const { baseElement } = render(<GlobalStyle theme={props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
