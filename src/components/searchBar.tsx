import React, { useEffect, useState } from "react";
import styled from "styled-components";

import selectedTheme from "./themeManager";

import { Button } from "./elements";

const Search = styled.form`
  width: 100%;
  height: 2rem;

  display: flex;

  padding-top: 0.25rem;
`;

const SearchInput = styled.input`
  width: 100%;

  font-size: 1rem;

  border: none;
  border-bottom: 1px solid ${selectedTheme.accentColor};

  background: none;
  border-radius: 0;
  color: ${selectedTheme.mainColor};

  margin: 0px;

  :focus {
    outline: none;
  }
`;

const SearchButton = styled(Button)`
  margin: 0px 2px;
  min-height: 0;
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
  let [input, setInput] = useState<string>("");
  let [buttonsHidden, setButtonsHidden] = useState<boolean>(true);

  useEffect(() => {
    setButtonsHidden(input === "");
  }, [input]);

  const handleSearchQuery = (e: React.FormEvent) => {
    var query: string = input || "";

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(query);
    } else {
      window.location.href = "https://google.com/search?q=" + query;
    }

    e.preventDefault();
  };

  const handleQueryWithProvider = (query: string) => {
    let queryArray: Array<string> = query.split(" ");
    let prefix: string = queryArray[0];

    queryArray.shift();

    let searchQuery: string = queryArray.join(" ");

    let providerFound: boolean = false;
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
    <Search onSubmit={(e) => handleSearchQuery(e)}>
      <SearchInput
        type="text"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      ></SearchInput>
      <SearchButton
        type="button"
        onClick={() => setInput("")}
        hidden={buttonsHidden}
      >
        Clear
      </SearchButton>
      <SearchButton type="submit" hidden={buttonsHidden}>
        Search
      </SearchButton>
    </Search>
  );
};

export default SearchBar;
