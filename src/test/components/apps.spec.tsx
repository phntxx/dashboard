import { render } from "@testing-library/react";
import {
  App,
  AppCategory,
  AppList,
  IAppProps,
  IAppCategoryProps,
  IAppListProps,
} from "../../components/apps";

const appProps: IAppProps = {
  name: "App Test",
  icon: "bug_report",
  url: "#",
  displayURL: "test",
};

const appCategoryProps: Array<IAppCategoryProps> = [
  {
    name: "Test",
    items: [appProps, appProps],
  },
  {
    name: "",
    items: [appProps, appProps],
  },
];

const appListProps: Array<IAppListProps> = [
  {
    categories: appCategoryProps,
    apps: [appProps, appProps],
  },
  {
    apps: undefined,
    categories: appCategoryProps,
  },
  {
    apps: [appProps, appProps],
    categories: undefined,
  },
  {
    apps: undefined,
    categories: undefined,
  },
];

describe("app.tsx", () => {
  it("Tests App rendering with newTab", () => {
    const tests = [true, false];

    tests.forEach((test: boolean) => {
      const { asFragment } = render(
        <App
          name={appProps.name}
          icon={appProps.icon}
          url={appProps.url}
          displayURL={appProps.displayURL}
          newTab={test}
        />,
      );

      expect(asFragment).toMatchSnapshot();
    });
  });

  it("Tests App rendering without newTab", () => {
    const { asFragment } = render(
      <App
        name={appProps.name}
        icon={appProps.icon}
        url={appProps.url}
        displayURL={appProps.displayURL}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests AppCategory rendering", () => {
    appCategoryProps.forEach((appCategory) => {
      const { asFragment } = render(
        <AppCategory name={appCategory.name} items={appCategory.items} />,
      );

      expect(asFragment).toMatchSnapshot();
    });
  });

  it("Tests AppList rendering", () => {
    appListProps.forEach((appList) => {
      const { asFragment } = render(
        <AppList apps={appList.apps} categories={appList.categories} />,
      );

      expect(asFragment).toMatchSnapshot();
    });
  });

  it("Tests AppList rendering without any props", () => {
    const { asFragment } = render(<AppList />);
    expect(asFragment).toMatchSnapshot();
  });
});
