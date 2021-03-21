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
const BookmarkList = ({ groups }: IBookmarkListProps) => {
  return (
    <ListContainer>
      <Headline>Bookmarks</Headline>
      <ItemList>
        {groups.map(({ groupName, items }, idx) => (
          <BookmarkGroup key={[groupName, idx].join("")} groupName={groupName} items={items} />
        ))}
      </ItemList>
    </ListContainer>
  );
};

export default BookmarkList;
