import { createGlobalStyle, ThemeProvider } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import { AppList } from "./components/apps";
import BookmarkList from "./components/bookmarks";
import Settings from "./components/settings";
import Imprint from "./components/imprint";

import { IThemeProps, getTheme, setScheme } from "./lib/useTheme";
import useFetch from "./lib/useFetch";
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
    searchData,
    themeData,
    imprintData,
    greeterData,
  } = useFetch();

  const theme = getTheme();
  let isDark = useMediaQuery("(prefers-color-scheme: dark)");
  setScheme(isDark ? "dark-theme" : "light-theme");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <SearchBar search={searchData} />
        <Settings themes={themeData} search={searchData} />
        <Greeter greeter={greeterData} />
        <AppList apps={appData?.apps} categories={appData?.categories} />
        <BookmarkList groups={bookmarkData} />
        <Imprint imprint={imprintData} />
      </div>
    </ThemeProvider>
  );
};

export default App;
