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

describe("appList.tsx", () => {
  it("Tests AppList rendering with categories and apps", () => {
    const { asFragment } = render(
      <AppList categories={props.categories} apps={props.apps} />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests AppList rendering with categories", () => {
    const { asFragment } = render(<AppList categories={props.categories} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Tests AppList rendering with apps", () => {
    const { asFragment } = render(<AppList apps={props.apps} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Tests AppList rendering with neither", () => {
    const { asFragment } = render(<AppList />);
    expect(asFragment).toMatchSnapshot();
  });
});
