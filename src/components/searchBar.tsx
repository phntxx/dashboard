import React, { useState } from "react";
import styled from "styled-components";

import selectedTheme from "./themeManager";

const SearchInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${selectedTheme.accentColor};
  background: none;
  border-radius: 0;
  color: ${selectedTheme.mainColor};
`;

export interface ISearchProviderProps {
  name: string;
  url: string;
  prefix: string;
}

interface ISearchBarProps {
  providers: Array<ISearchProviderProps> | undefined;
}

const SearchBar = ({ providers }: ISearchBarProps) => {
  let [input, setInput] = useState("");

  const handleSearchQuery = (e: React.FormEvent) => {
    var query = input || "";

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(query);
    } else {
      window.location.href = "https://google.com/search?q=" + query;
    }

    e.preventDefault();
  };

  const handleQueryWithProvider = (query: string) => {
    let queryArray = query.split(" ");
    let prefix = queryArray[0];
    queryArray.shift();

    let searchQuery = queryArray.join(" ");

    let providerFound = false;
    if (providers) {
      providers.forEach((provider: ISearchProviderProps) => {
        if (provider.prefix === prefix) {
          providerFound = true;
          window.location.href = provider.url + searchQuery;
        }
      });
    }

    if (!providerFound)
      window.location.href = "https://google.com/search?q=" + query;
  };

  return (
    <form onSubmit={(e) => handleSearchQuery(e)}>
      <SearchInput
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></SearchInput>
      <button type="submit" hidden />
    </form>
  );
};

export default SearchBar;
