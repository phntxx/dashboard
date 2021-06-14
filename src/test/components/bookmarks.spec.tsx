import { render } from "@testing-library/react";
import BookmarkList, {
  BookmarkGroup,
  IBookmarkGroupProps,
  IBookmarkListProps,
} from "../../components/bookmarks";

const bookmarkGroupProps: IBookmarkGroupProps = {
  name: "Test Group",
  items: [
    {
      name: "Bookmark Test",
      url: "#",
    },
  ],
};

const bookmarkListProps: IBookmarkListProps = {
  groups: [bookmarkGroupProps, bookmarkGroupProps],
};

it("BookmarkGroup snapshot test", () => {
  const { asFragment } = render(
    <BookmarkGroup
      name={bookmarkGroupProps.name}
      items={bookmarkGroupProps.items}
    />,
  );

  expect(asFragment).toMatchSnapshot();
});

it("BookmarkList snapshot test", () => {
  const { asFragment } = render(
    <BookmarkList groups={bookmarkListProps.groups} />,
  );

  expect(asFragment).toMatchSnapshot();
});
