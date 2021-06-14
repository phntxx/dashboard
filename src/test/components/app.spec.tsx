import { render } from "@testing-library/react";
import App, { IAppProps } from "../../components/app";

const props: IAppProps = {
  name: "App Test",
  icon: "bug_report",
  url: "#",
  displayURL: "test",
  newTab: false,
};

it("should take a snapshot", () => {
  const { asFragment } = render(
    <App
      name={props.name}
      icon={props.icon}
      url={props.url}
      displayURL={props.displayURL}
      newTab={props.newTab}
    />,
  );

  expect(asFragment).toMatchSnapshot();
});
