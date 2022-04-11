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
    const { baseElement } = render(
      <AppList categories={props.categories} apps={props.apps} />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests AppList rendering with categories", () => {
    const { baseElement } = render(<AppList categories={props.categories} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("Tests AppList rendering with apps", () => {
    const { baseElement } = render(<AppList apps={props.apps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("Tests AppList rendering with neither", () => {
    const { baseElement } = render(<AppList />);
    expect(baseElement).toMatchSnapshot();
  });
});
