import React from "react";
import { Headline, ListContainer, ItemList } from "./elements";
import { BookmarkGroup, IBookmarkGroupProps } from "./bookmarkGroup";

interface IBookmarkListProps {
  groups: Array<IBookmarkGroupProps>;
}

/**
 * Renders a given list of categorized bookmarks
 * @param {IBookmarkListProps} props - The props of the given bookmark list
 */
const BookmarkList = ({ groups }: IBookmarkListProps) => (
  <ListContainer>
    <Headline>Bookmarks</Headline>
    <ItemList>
      {groups.map(({ name, items }, idx) => (
        <BookmarkGroup key={[name, idx].join("")} name={name} items={items} />
      ))}
    </ItemList>
  </ListContainer>
);

export default BookmarkList;
