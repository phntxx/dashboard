import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import SearchBar from './components/searchBar'
import Greeter from './components/greeter'
import AppList from './components/appList'
import BookmarkList from './components/bookmarkList'
import SettingsModal from './components/settingsModal'

import getTheme from './components/themeManager';
const selectedTheme = getTheme();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${selectedTheme.backgroundColor};
  }
`;

const AppContainer = styled.div`
  max-width: 80%;
  margin: auto;
  padding: 10px;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <SearchBar />
      <SettingsModal />
      <Greeter />
      <AppList />
      <BookmarkList />
    </AppContainer>
  </>
);

export default App;
