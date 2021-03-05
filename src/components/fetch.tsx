import { useCallback, useEffect, useState } from "react";
import { ISearchProviderProps } from "./searchBar";
import { IBookmarkGroupProps } from "./bookmarkGroup";
import { IAppCategoryProps } from "./appCategory";
import { IAppProps } from "./app";
import { IThemeProps } from "./themeManager";
import { IImprintProps } from "./imprint";

const errorMessage = "Failed to load data.";

const handleResponse = (response: any) => {
  if (response.ok) return response.json();
  throw new Error(errorMessage);
};

// SECTION: Search Provider

export interface ISearchProviderDataProps {
  providers: Array<ISearchProviderProps>;
  error: string | boolean;
}

export const useSearchProviderData = () => {
  const [
    searchProviderData,
    setSearchProviderData,
  ] = useState<ISearchProviderDataProps>({ providers: [], error: false });

  const fetchSearchProviderData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/search.json").then(handleResponse)
      : import("./data/search.json")
    )
      .then((jsonResponse) => {
        setSearchProviderData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setSearchProviderData({ providers: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchSearchProviderData();
  }, [fetchSearchProviderData]);

  return { searchProviderData, fetchSearchProviderData };
};

// SECTION: Bookmark data

export interface IBookmarkDataProps {
  groups: Array<IBookmarkGroupProps>;
  error: string | boolean;
}

export const useBookmarkData = () => {
  const [bookmarkData, setBookmarkData] = useState<IBookmarkDataProps>({
    groups: [],
    error: false,
  });

  const fetchBookmarkData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/bookmarks.json").then(handleResponse)
      : import("./data/bookmarks.json")
    )
      .then((jsonResponse) => {
        setBookmarkData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setBookmarkData({ groups: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchBookmarkData();
  }, [fetchBookmarkData]);

  return { bookmarkData, fetchBookmarkData };
};

// SECTION: App data

export interface IAppDataProps {
  categories: Array<IAppCategoryProps>;
  apps: Array<IAppProps>;
  error: string | boolean;
}

export const useAppData = () => {
  const [appData, setAppData] = useState({
    categories: [],
    apps: [],
    error: false,
  });

  const fetchAppData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/apps.json").then(handleResponse)
      : import("./data/apps.json")
    )
      .then((jsonResponse) => {
        setAppData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setAppData({ categories: [], apps: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);
  return { appData, fetchAppData };
};

// Section: Theme Data

export interface IThemeDataProps {
  themes: Array<IThemeProps>;
  error: string | boolean;
}

export const useThemeData = () => {
  const [themeData, setThemeData] = useState<IThemeDataProps>({
    themes: [],
    error: false,
  });

  const fetchThemeData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/themes.json").then(handleResponse)
      : import("./data/themes.json")
    )
      .then((jsonResponse) => {
        setThemeData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setThemeData({ themes: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchThemeData();
  }, [fetchThemeData]);
  return { themeData, fetchThemeData };
};

// SECTION: Imprint Data

export interface IImprintDataProps {
  imprint: IImprintProps;
  error: string | boolean;
}

export const useImprintData = () => {
  const [imprintData, setImprintData] = useState<IImprintDataProps>({
    imprint: {
      name: { text: "", link: "" },
      address: { text: "", link: "" },
      phone: { text: "", link: "" },
      email: { text: "", link: "" },
      url: { text: "", link: "" },
    },
    error: false,
  });

  const fetchImprintData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/imprint.json").then(handleResponse)
      : import("./data/imprint.json")
    )
      .then((jsonResponse: any) => {
        setImprintData({ ...jsonResponse, error: false });
      })
      .catch((error: any) => {
        setImprintData({
          imprint: {
            name: { text: "", link: "" },
            address: { text: "", link: "" },
            phone: { text: "", link: "" },
            email: { text: "", link: "" },
            url: { text: "", link: "" },
          },
          error: error.message,
        });
      });
  }, []);

  useEffect(() => {
    fetchImprintData();
  }, [fetchImprintData]);
  return { imprintData, fetchImprintData };
};
