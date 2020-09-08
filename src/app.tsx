import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import AppList from "./components/appList";
import BookmarkList from "./components/bookmarkList";
import Settings from "./components/settings";

import selectedTheme from "./components/themeManager";

import Imprint from "./components/imprint";

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

const AppContainer = styled.div``;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <SearchBar />
      <Settings />
      <Greeter />
      <AppList />
      <BookmarkList />
      <Imprint />
    </AppContainer>
  </>
);

export default App;
