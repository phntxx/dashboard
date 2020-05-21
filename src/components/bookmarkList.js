import React from "react";
import styled from "styled-components";

import bookmarkData from "./data/bookmarks.json";

import selectedTheme from "./themeManager";
import { Headline, ListContainer, ItemList, Item } from "./elements";

const Group = styled.h4`
  font-family: Roboto, sans-serif;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: ${selectedTheme.mainColor};
`;

const BookmarkGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 auto;
  padding: 1rem 0 1rem 0;
`;

const Bookmark = styled.a`
  font-family: Roboto, sans-serif;
  font-weight: 400;
  text-decoration: none;
  color: ${selectedTheme.accentColor};
  padding: 10px 0 0 0;
  font-size: 14px;
`;

const bookmarkList = () => (
  <ListContainer>
    <Headline>Bookmarks</Headline>
    <ItemList>
      {bookmarkData.groups.map((group, index) => (
        <Item key={group.name + index}>
          <BookmarkGroup>
            <Group>{group.name}</Group>
            {group.items.map(link => (
              <Bookmark key={link.name} href={link.url}>
                {link.name}
              </Bookmark>
            ))}
          </BookmarkGroup>
        </Item>
      ))}
    </ItemList>
  </ListContainer>
);

export default bookmarkList;
