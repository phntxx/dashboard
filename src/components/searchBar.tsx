import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Button } from "./elements";

const Search = styled.form`
  width: 100%;
  height: 2rem;

  display: flex;

  padding-top: 0.25rem;
`;

const SearchInput = styled.input`
  width: 100%;
  margin: 0px;

  font-size: 1rem;

  border: none;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 0;

  background: none;
  color: ${(props) => props.theme.mainColor};

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

export interface ISearchProps {
  autofocus: boolean;
  placeholder: string;
  defaultProvider: string;
  providers: Array<ISearchProviderProps> | undefined;
}

interface ISearchBarProps {
  search: ISearchProps;
}

export const handleQueryWithProvider = (
  search: ISearchProps,
  query: string,
) => {
  let queryArray: Array<string> = query.split(" ");
  let prefix: string = queryArray[0];

  queryArray.shift();

  let searchQuery: string = queryArray.join(" ");

  let providerFound: boolean = false;
  if (search.providers) {
    search.providers.forEach((provider: ISearchProviderProps) => {
      if (provider.prefix === prefix) {
        providerFound = true;
        window.location.href = provider.url + searchQuery;
      }
    });
  }

  if (!providerFound) window.location.href = search.defaultProvider + query;
};

/**
 * Renders a search bar
 * @param {ISearchBarProps} search - The search providers for the search bar to use
 */
const SearchBar = ({ search }: ISearchBarProps) => {
  let [input, setInput] = useState<string>("");
  let [buttonsHidden, setButtonsHidden] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.autofocus) inputRef.current?.focus();
  }, [search]);
  useEffect(() => setButtonsHidden(input === ""), [input]);

  const handleSearchQuery = (e: React.FormEvent) => {
    var query: string = input || "";

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(search, query);
    } else {
      window.location.href = search.defaultProvider + query;
    }

    e.preventDefault();
  };

  return (
    <Search onSubmit={(e) => handleSearchQuery(e)}>
      <SearchInput
        ref={inputRef}
        type="text"
        data-testid="search-input"
        value={input}
        placeholder={search.placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      ></SearchInput>
      <SearchButton
        type="button"
        data-testid="search-clear"
        onClick={() => setInput("")}
        hidden={buttonsHidden}
      >
        Clear
      </SearchButton>
      <SearchButton
        type="submit"
        data-testid="search-submit"
        hidden={buttonsHidden}
      >
        Search
      </SearchButton>
    </Search>
  );
};

export default SearchBar;
