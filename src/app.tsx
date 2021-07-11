import { createGlobalStyle, ThemeProvider } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import AppList from "./components/appList";
import BookmarkList from "./components/bookmarks";
import Settings from "./components/settings";
import Imprint from "./components/imprint";

import { IThemeProps, getTheme, setScheme } from "./lib/theme";
import useFetcher from "./lib/fetcher";
import useMediaQuery from "./lib/useMediaQuery";

export const GlobalStyle = createGlobalStyle<{ theme: IThemeProps }>`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
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

  const theme = getTheme();
  let isDark = useMediaQuery("(prefers-color-scheme: dark)");
  if (isDark) {
    setScheme("dark-theme");
  } else {
    setScheme("light-theme");
  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
