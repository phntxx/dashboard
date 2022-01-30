import { render } from "@testing-library/react";
import BookmarkList, {
  Bookmark,
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

it("tests rendering of Bookmark with newTab=true", () => {
  let props = bookmarkGroupProps.items[0];
  const { asFragment } = render(
    <Bookmark name={props.name} url={props.url} newTab={true} />,
  );

  expect(asFragment).toMatchSnapshot();
});

it("tests rendering of Bookmark with newTab=false", () => {
  let props = bookmarkGroupProps.items[0];
  const { asFragment } = render(
    <Bookmark name={props.name} url={props.url} newTab={false} />,
  );

  expect(asFragment).toMatchSnapshot();
});

it("tests rendering of Bookmark without newTab", () => {
  let props = bookmarkGroupProps.items[0];
  const { asFragment } = render(<Bookmark name={props.name} url={props.url} />);

  expect(asFragment).toMatchSnapshot();
});

it("tests rendering of BookmarkGroup", () => {
  const { asFragment } = render(
    <BookmarkGroup
      name={bookmarkGroupProps.name}
      items={bookmarkGroupProps.items}
    />,
  );

  expect(asFragment).toMatchSnapshot();
});

it("tests rendering of BookmarkList", () => {
  const { asFragment } = render(
    <BookmarkList groups={bookmarkListProps.groups} />,
  );

  expect(asFragment).toMatchSnapshot();
});
