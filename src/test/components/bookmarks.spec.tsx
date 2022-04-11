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
  const { baseElement } = render(
    <Bookmark name={props.name} url={props.url} newTab={true} />,
  );

  expect(baseElement).toMatchSnapshot();
});

it("tests rendering of Bookmark with newTab=false", () => {
  let props = bookmarkGroupProps.items[0];
  const { baseElement } = render(
    <Bookmark name={props.name} url={props.url} newTab={false} />,
  );

  expect(baseElement).toMatchSnapshot();
});

it("tests rendering of Bookmark without newTab", () => {
  let props = bookmarkGroupProps.items[0];
  const { baseElement } = render(
    <Bookmark name={props.name} url={props.url} />,
  );

  expect(baseElement).toMatchSnapshot();
});

it("tests rendering of BookmarkGroup", () => {
  const { baseElement } = render(
    <BookmarkGroup
      name={bookmarkGroupProps.name}
      items={bookmarkGroupProps.items}
    />,
  );

  expect(baseElement).toMatchSnapshot();
});

it("tests rendering of BookmarkList", () => {
  const { baseElement } = render(
    <BookmarkList groups={bookmarkListProps.groups} />,
  );

  expect(baseElement).toMatchSnapshot();
});
