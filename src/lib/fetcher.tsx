import { useCallback, useEffect, useState } from "react";

import { ISearchProps } from "../components/searchBar";
import { IBookmarkGroupProps } from "../components/bookmarks";
import { IAppCategoryProps } from "../components/appCategory";
import { IAppProps } from "../components/app";
import { IThemeProps } from "./useTheme";
import { IImprintProps } from "../components/imprint";
import { IGreeterProps } from "../components/greeter";

const errorMessage = "Failed to load data.";
const inProduction = process.env.NODE_ENV === "production";

/**
 * Handles the response from the fetch requests
 * @param {Response} response - The response given by the fetch request
 * @returns - The response in JSON
 * @throws - Error with given error message if request failed
 */
export const handleResponse = (response: Response) => {
  if (response.ok) return response.json();
  throw new Error(errorMessage);
};

export interface ISearchDataProps {
  search: ISearchProps;
  error: string | boolean;
}

export interface IBookmarkDataProps {
  groups: Array<IBookmarkGroupProps>;
  error: string | boolean;
}

export interface IAppDataProps {
  categories: Array<IAppCategoryProps>;
  apps: Array<IAppProps>;
  error: string | boolean;
}

export interface IThemeDataProps {
  themes: Array<IThemeProps>;
  error: string | boolean;
}

export interface IImprintDataProps {
  imprint: IImprintProps;
  error: string | boolean;
}

export interface IGreeterDataProps {
  greeter: IGreeterProps;
  error: string | boolean;
}

/**
 * Default values for the respective state variables
 */
export const defaults = {
  app: {
    categories: [],
    apps: [],
    error: false,
  },
  bookmark: {
    groups: [],
    error: false,
  },
  search: {
    search: {
      autofocus: false,
      placeholder: "",
      defaultProvider: "https://google.com/search?q=",
      providers: [],
    },
    error: false,
  },
  theme: {
    themes: [],
    error: false,
  },
  imprint: {
    imprint: {
      name: { text: "", link: "" },
      address: { text: "", link: "" },
      phone: { text: "", link: "" },
      email: { text: "", link: "" },
      url: { text: "", link: "" },
      text: "",
    },
    error: false,
  },
  greeter: {
    greeter: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      greetings: [
        {
          greeting: "Good night!",
          start: 0,
          end: 6,
        },
        {
          greeting: "Good morning!",
          start: 6,
          end: 12,
        },
        {
          greeting: "Good afternoon!",
          start: 12,
          end: 18,
        },
        {
          greeting: "Good evening!",
          start: 18,
          end: 0,
        },
      ],
      dateformat: "%wd, %m %d%e %y",
    },
    error: false,
  },
};

/**
 * Handles fetch errors by returning the error message.
 * @param {string} type - The type of fetch request that threw an error
 * @param {Error} error - The error itself
 */
export const handleError = (status: string, error: Error) => {
  switch (status) {
    case "apps":
      return { ...defaults.app, error: error.message };
    case "bookmark":
      return { ...defaults.bookmark, error: error.message };
    case "searchProvider":
      return { ...defaults.search, error: error.message };
    case "theme":
      return { ...defaults.theme, error: error.message };
    case "imprint":
      return { ...defaults.imprint, error: error.message };
    case "greeter":
      return { ...defaults.greeter, error: error.message };
    default:
      break;
  }
};

/**
 * Fetches all of the data by doing fetch requests (only available in production)
 */
export const fetchProduction = Promise.all([
  fetch("/data/apps.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("apps", error)),
  fetch("/data/bookmarks.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("bookmark", error)),
  fetch("/data/search.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("searchProvider", error)),
  fetch("/data/themes.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("theme", error)),
  fetch("/data/imprint.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("imprint", error)),
  fetch("/data/greeter.json")
    .then(handleResponse)
    .catch((error: Error) => handleError("greeter", error)),
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
export const useFetcher = () => {
  const [appData, setAppData] = useState<IAppDataProps>(defaults.app);

  const [bookmarkData, setBookmarkData] = useState<IBookmarkDataProps>(
    defaults.bookmark,
  );

  const [searchProviderData, setSearchProviderData] =
    useState<ISearchDataProps>(defaults.search);

  const [themeData, setThemeData] = useState<IThemeDataProps>(defaults.theme);

  const [imprintData, setImprintData] = useState<IImprintDataProps>(
    defaults.imprint,
  );

  const [greeterData, setGreeterData] = useState<IGreeterDataProps>(
    defaults.greeter,
  );

  const callback = useCallback(() => {
    (inProduction ? fetchProduction : fetchDevelopment).then(
      ([
        appData,
        bookmarkData,
        searchData,
        themeData,
        imprintData,
        greeterData,
      ]: [
        IAppDataProps,
        IBookmarkDataProps,
        ISearchDataProps,
        IThemeDataProps,
        IImprintDataProps,
        IGreeterDataProps,
      ]) => {
        setAppData(appData.error ? appData : { ...appData, error: false });
        setBookmarkData(
          bookmarkData.error ? bookmarkData : { ...bookmarkData, error: false },
        );
        setSearchProviderData(
          searchData.error ? searchData : { ...searchData, error: false },
        );
        setThemeData(
          themeData.error ? themeData : { ...themeData, error: false },
        );
        setImprintData(
          imprintData.error ? imprintData : { ...imprintData, error: false },
        );
        setGreeterData(
          greeterData.error ? greeterData : { ...greeterData, error: false },
        );
      },
    );
  }, []);

  useEffect(() => callback(), [callback]);

  return {
    appData,
    bookmarkData,
    searchProviderData,
    themeData,
    imprintData,
    greeterData,
    callback,
  };
};

export default useFetcher;
