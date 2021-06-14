import { render } from "@testing-library/react";
import AppList, { IAppListProps } from "../../components/appList";

const props: IAppListProps = {
  categories: [
    {
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
    },
  ],
  apps: [
    {
      name: "App Test",
      icon: "bug_report",
      url: "#",
      displayURL: "test",
      newTab: false,
    },
  ],
};

it("AppList snapshot test", () => {
  const { asFragment } = render(
    <AppList categories={props.categories} apps={props.apps} />,
  );

  expect(asFragment).toMatchSnapshot();
});
