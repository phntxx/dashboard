import { render } from "@testing-library/react";
import App, { IAppProps } from "../../components/app";

const props: IAppProps = {
  name: "App Test",
  icon: "bug_report",
  url: "#",
  displayURL: "test",
};

describe("app.tsx", () => {
  it("Tests app rendering with newTab=true", () => {
    const { asFragment } = render(
      <App
        name={props.name}
        icon={props.icon}
        url={props.url}
        displayURL={props.displayURL}
        newTab={true}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests app rendering with newTab=false", () => {
    const { asFragment } = render(
      <App
        name={props.name}
        icon={props.icon}
        url={props.url}
        displayURL={props.displayURL}
        newTab={false}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests app rendering without newTab", () => {
    const { asFragment } = render(
      <App
        name={props.name}
        icon={props.icon}
        url={props.url}
        displayURL={props.displayURL}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });
});
