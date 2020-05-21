import React, { useState } from "react";
import styled from "styled-components";

import searchData from "./data/search.json";

import selectedTheme from "./themeManager";

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${selectedTheme.accentColor};
  background: none;
  border-radius: 0;
  color: ${selectedTheme.mainColor};
`;

const handleQueryWithProvider = query => {
  let queryArray = query.split(" ");

  let prefix = queryArray[0];

  queryArray.shift();

  let searchQuery = queryArray.join(" ");

  var foundProvider = false;
  searchData.providers.forEach(provider => {
    if (provider.prefix === prefix) {
      foundProvider = true;
      window.location = provider.url + searchQuery;
    }
  });

  if (!foundProvider) {
    window.location = "https://google.com/search?q=" + query;
  }
};

const SearchBar = () => {
  let [input, setInput] = useState();

  const handleSearchQuery = e => {
    var query = input;

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(query);
    } else {
      window.location = "https://google.com/search?q=" + query;
    }

    e.preventDefault();
  };

  return (
    <form onSubmit={e => handleSearchQuery(e)}>
      <SearchInput
        type="text"
        onChange={e => setInput(e.target.value)}
      ></SearchInput>
      <button type="submit" hidden />
    </form>
  );
};

export default SearchBar;
