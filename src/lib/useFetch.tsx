import { useCallback, useEffect, useState } from "react";

import { ISearchProps } from "../components/searchBar";
import { IBookmarkGroupProps } from "../components/bookmarks";
import { IAppProps, IAppCategoryProps } from "../components/apps";
import { IImprintProps } from "../components/imprint";
import { IGreeterProps } from "../components/greeter";

import { IThemeProps } from "./useTheme";

const inProduction = process.env.NODE_ENV === "production";

export interface IAppDataProps {
  categories: Array<IAppCategoryProps>;
  apps: Array<IAppProps>;
}

export interface IBookmarkDataProps {
  groups: Array<IBookmarkGroupProps>;
}

export interface IGreeterDataProps {
  greeter: IGreeterProps;
}

export interface IImprintDataProps {
  imprint: IImprintProps;
}

export interface ISearchDataProps {
  search: ISearchProps;
}

export interface IThemeDataProps {
  themes: Array<IThemeProps>;
}

/**
 * Fetches all of the data by doing fetch requests (only available in production)
 */
export const fetchProduction = Promise.all([
  fetch("/data/apps.json")
    .then((res) => res.json())
    .catch(console.error),
  fetch("/data/bookmarks.json")
    .then((res) => res.json())
    .catch(console.error),
  fetch("/data/search.json")
    .then((res) => res.json())
    .catch(console.error),
  fetch("/data/themes.json")
    .then((res) => res.json())
    .catch(console.error),
  fetch("/data/imprint.json")
    .then((res) => res.json())
    .catch(console.error),
  fetch("/data/greeter.json")
    .then((res) => res.json())
    .catch(console.error),
]);

/**
 * Fetches all of the data by importing it (only available in development)
 */
export const fetchDevelopment = Promise.all([
  import("../data/apps.json"),
  import("../data/bookmarks.json"),
  import("../data/search.json"),
  import("../data/themes.json"),
  import("../data/imprint.json"),
  import("../data/greeter.json"),
]);

/**
 * Fetches app, bookmark, search, theme and imprint data and returns it.
 */
export const useFetch = () => {
  const [appData, setAppData] = useState<IAppDataProps>();
  const [bookmarkData, setBookmarkData] =
    useState<Array<IBookmarkGroupProps>>();
  const [greeterData, setGreeterData] = useState<IGreeterProps>();
  const [imprintData, setImprintData] = useState<IImprintProps>();
  const [searchData, setSearchData] = useState<ISearchProps>();
  const [themeData, setThemeData] = useState<Array<IThemeProps>>();

  const callback = useCallback(() => {
    (inProduction ? fetchProduction : fetchDevelopment).then(
      ([apps, { groups }, { search }, { themes }, { imprint }, { greeter }]: [
        IAppDataProps,
        IBookmarkDataProps,
        ISearchDataProps,
        IThemeDataProps,
        IImprintDataProps,
        IGreeterDataProps,
      ]) => {
        setAppData(apps);
        setBookmarkData(groups);
        setSearchData(search);
        setThemeData(themes);
        setImprintData(imprint);
        setGreeterData(greeter);
      },
    );
  }, []);

  useEffect(() => callback(), [callback]);

  return {
    appData,
    bookmarkData,
    searchData,
    themeData,
    imprintData,
    greeterData,
    callback,
  };
};

export default useFetch;
