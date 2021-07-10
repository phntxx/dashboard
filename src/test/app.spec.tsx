import { render } from "@testing-library/react";
import App, { GlobalStyle } from "../app";

describe("app.tsx", () => {
  it("Tests GlobalStyle", () => {
    const { asFragment } = render(<GlobalStyle />);
    expect(asFragment).toMatchSnapshot();
  });
});
