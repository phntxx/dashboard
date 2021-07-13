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

describe("bookmarks.tsx", () => {
  it("Tests BookmarkGroup rendering", () => {
    const { asFragment } = render(
      <BookmarkGroup
        name={bookmarkGroupProps.name}
        items={bookmarkGroupProps.items}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests BookmarkList rendering with props", () => {
    const { asFragment } = render(
      <BookmarkList groups={bookmarkListProps.groups} />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests BookmarkList rendering without props", () => {
    const { asFragment } = render(<BookmarkList />);
    expect(asFragment).toMatchSnapshot();
  });
});
