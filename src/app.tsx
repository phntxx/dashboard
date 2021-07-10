import { createGlobalStyle } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import AppList from "./components/appList";
import BookmarkList from "./components/bookmarks";
import Settings from "./components/settings";
import Imprint from "./components/imprint";

import selectedTheme from "./lib/theme";
import useFetcher from "./lib/fetcher";

export const GlobalStyle = createGlobalStyle`
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

/**
 * Renders the entire app by calling individual components
 */
const App = () => {
  const {
    appData,
    bookmarkData,
    searchProviderData,
    themeData,
    imprintData,
    greeterData,
  } = useFetcher();

  return (
    <>
      <GlobalStyle />
      <div>
        <SearchBar search={searchProviderData?.search} />
        {(!themeData.error || !searchProviderData.error) && (
          <Settings
            themes={themeData?.themes}
            search={searchProviderData?.search}
          />
        )}
        <Greeter data={greeterData.greeter} />
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
