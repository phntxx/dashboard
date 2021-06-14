import { render } from "@testing-library/react";
import AppCategory, { IAppCategoryProps } from "../../components/appCategory";

const props: IAppCategoryProps = {
  name: "Category Test",
  items: [
    {
      name: "App Test",
      icon: "bug_report",
      url: "#",
      displayURL: "test",
      newTab: false,
    },
    {
      name: "App Test",
      icon: "bug_report",
      url: "#",
      displayURL: "test",
      newTab: false,
    },
  ],
};

it("AppCategory snapshot test", () => {
  const { asFragment } = render(
    <AppCategory name={props.name} items={props.items} />,
  );

  expect(asFragment).toMatchSnapshot();
});
