import React from "react";
import styled from "styled-components";
import { Item, SubHeadline } from "./elements";
import selectedTheme from "./themeManager";

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 auto;
  padding: 1rem 0;
`;

const Bookmark = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: ${selectedTheme.accentColor};
  padding-top: 0.75rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

interface IBookmarkProps {
  name: string;
  url: string;
}

interface IBookmarkGroupProps {
  name: string;
  items: [IBookmarkProps];
}

export const BookmarkGroup = ({
  name: groupName,
  items
}: IBookmarkGroupProps) => (
  <Item>
    <GroupContainer>
      <SubHeadline>{groupName}</SubHeadline>
      {items.map(({ name, url }, idx) => (
        <Bookmark key={[name, idx].join("")} href={url}>
          {name}
        </Bookmark>
      ))}
    </GroupContainer>
  </Item>
);
