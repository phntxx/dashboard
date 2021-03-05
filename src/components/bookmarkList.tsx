import React from "react";

import { Headline, ListContainer, ItemList } from "./elements";

import { BookmarkGroup, IBookmarkGroupProps } from "./bookmarkGroup";

interface IBookmarkListProps {
  groups: Array<IBookmarkGroupProps>;
}

const BookmarkList = ({ groups }: IBookmarkListProps) => {
  return (
    <ListContainer>
      <Headline>Bookmarks</Headline>
      <ItemList>
        {groups.map(({ name, items }, idx) => (
          <BookmarkGroup key={[name, idx].join("")} name={name} items={items} />
        ))}
      </ItemList>
    </ListContainer>
  );
};

export default BookmarkList;
