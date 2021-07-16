import React, { useCallback, useEffect, useState } from "react";
import { IAppListProps } from "../components/apps";
import { IThemeProps } from "./useTheme";
import { IBookmarkListProps } from "../components/bookmarks";
import { ISearchProps } from "../components/searchBar";
import { IImprintProps } from "../components/imprint";
import { IGreeterProps } from "../components/greeter";

const inProduction = process.env.NODE_ENV === "production";

interface IFetchItemProps {
  url: string;
  setHook?: React.Dispatch<React.SetStateAction<any>>;
}

interface IFetchListProps {
  app: IFetchItemProps;
  bookmarks: IFetchItemProps;
  greeter: IFetchItemProps;
  imprint: IFetchItemProps;
  search: IFetchItemProps;
  themes: IFetchItemProps;
}

let fetchList: IFetchListProps = {
  app: { url: "/data/app.json" },
  bookmarks: { url: "/data/bookmarks.json" },
  greeter: { url: "/data/greeter.json" },
  imprint: { url: "/data/imprint.json" },
  search: { url: "/data/search.json" },
  themes: { url: "/data/themes.json" },
};

export const handleResponse = (response: Response, type: string) => {
  if (response.ok) return response.json();
  throw new Error("Error fetching " + type + " data");
};

const handleError = (error: Error) => {
  console.error(error.message);
};

const fetchURL = (url: string, type: string) => {
  const response = inProduction ? fetch(url) : import(".." + url);

  return response
    .then((response: Response) => handleResponse(response, type))
    .catch(handleError);
};

const useFetch = () => {
  const [appData, setAppData] = useState<IAppListProps>();
  fetchList.app.setHook = setAppData;

  const [bookmarkData, setBookmarkData] = useState<IBookmarkListProps>();
  fetchList.bookmarks.setHook = setBookmarkData;

  const [greeterData, setGreeterData] = useState<IGreeterProps>();
  fetchList.greeter.setHook = setGreeterData;

  const [imprintData, setImprintData] = useState<IImprintProps>();
  fetchList.imprint.setHook = setImprintData;

  const [searchData, setSearchData] = useState<ISearchProps>();
  fetchList.search.setHook = setSearchData;

  const [themeData, setThemeData] = useState<Array<IThemeProps>>();
  fetchList.themes.setHook = setThemeData;

  const callback = useCallback(() => {
    Object.entries(fetchList).forEach(([key, val]) => {
      fetchURL(val.url, key).then((data) => {
        val.setHook(data);
      });
    });
  }, []);

  useEffect(() => callback(), [callback]);

  return {
    appData,
    bookmarkData,
    greeterData,
    imprintData,
    searchData,
    themeData,
    callback,
  };
};

export default useFetch;
