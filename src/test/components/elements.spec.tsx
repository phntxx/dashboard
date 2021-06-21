import { render } from "@testing-library/react";
import {
  ListContainer,
  Headline,
  SubHeadline,
  ItemList,
  Item,
  Button,
} from "../../components/elements";

it("Tests Lists", () => {
  const { asFragment } = render(
    <ListContainer>
      <ItemList>
        <Item>Test</Item>
      </ItemList>
    </ListContainer>,
  );

  expect(asFragment).toMatchSnapshot();
});

it("Tests Headline", () => {
  const { asFragment } = render(<Headline>Test</Headline>);

  expect(asFragment).toMatchSnapshot();
});

it("Tests SubHeadline", () => {
  const { asFragment } = render(<SubHeadline>Test</SubHeadline>);

  expect(asFragment).toMatchSnapshot();
});

it("Tests Button", () => {
  const { asFragment } = render(<Button>Test</Button>);

  expect(asFragment).toMatchSnapshot();
});
