import React, { useEffect, useState } from "react";
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
  placeholder: string;
  defaultProvider: string;
  autoFocus?: boolean;
  providers: Array<ISearchProviderProps> | undefined;
}

interface ISearchBarProps {
  search?: ISearchProps;
}

export const handleQueryWithProvider = (
  search: ISearchProps,
  query: string,
) => {
  const queryArray: Array<string> = query.split(" ");
  const prefix: string = queryArray[0];

  queryArray.shift();

  const searchQuery: string = queryArray.join(" ");

  let providerFound = false;
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
  const [input, setInput] = useState<string>("");
  const [buttonsHidden, setButtonsHidden] = useState<boolean>(true);

  useEffect(() => setButtonsHidden(input === ""), [input]);

  if (search === undefined) return <></>;

  const handleSearchQuery = (e: React.FormEvent) => {
    const query: string = input || "";

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(search, query);
    } else {
      window.location.href = search.defaultProvider + query;
    }

    e.preventDefault();
  };

  const autoFocus = () => {
    return search.autoFocus !== undefined ? search.autoFocus : false;
  };

  return (
    <Search onSubmit={(e) => handleSearchQuery(e)}>
      <SearchInput
        type="text"
        data-testid="search-input"
        value={input}
        placeholder={search.placeholder}
        autoFocus={autoFocus()}
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
