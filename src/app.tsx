import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import AppList from "./components/appList";
import BookmarkList from "./components/bookmarkList";
import Settings from "./components/settings";
import Imprint from "./components/imprint";

import selectedTheme from "./components/themeManager";
import {
  useAppData,
  useSearchProviderData,
  useBookmarkData,
  useThemeData,
  useImprintData,
} from "./components/fetch";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${selectedTheme.backgroundColor};
    font-family: Roboto, sans-serif;
  
    margin: auto;
    max-width: 95%;
    max-height: 100%;

    @media (min-width: 1366px) {
      max-width: 70%;
    }
  }
`;

const App = () => {
  const { appData } = useAppData();
  const { searchProviderData } = useSearchProviderData();
  const { bookmarkData } = useBookmarkData();
  const { themeData } = useThemeData();
  const { imprintData } = useImprintData();

  return (
    <>
      <GlobalStyle />
      <div>
        <SearchBar providers={searchProviderData?.providers} />
        {!themeData.error && !searchProviderData.error && (
          <Settings
            themes={themeData?.themes}
            providers={searchProviderData?.providers}
          />
        )}

        <Greeter />
        {!appData.error && (
          <AppList apps={appData.apps} categories={appData.categories} />
        )}
        {!bookmarkData.error && <BookmarkList groups={bookmarkData.groups} />}
        {!imprintData.error && <Imprint imprint={imprintData.imprint} />}
      </div>
    </>
  );
};

export default App;
