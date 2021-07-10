import styled from "styled-components";
import App, { IAppProps } from "./app";
import { ItemList, Item, SubHeadline } from "./elements";

const CategoryHeadline = styled(SubHeadline)`
  padding-top: 1rem;
`;

const CategoryContainer = styled.div`
  width: 100%;
`;

export interface IAppCategoryProps {
  name: string;
  items: Array<IAppProps>;
}

/**
 * Renders one app category
 * @param {IAppCategoryProps} props props of the given category
 * @returns {React.ReactNode} the app category node
 */
const AppCategory = ({ name, items }: IAppCategoryProps) => (
  <CategoryContainer>
    {name && <CategoryHeadline>{name}</CategoryHeadline>}
    <ItemList>
      {items.map(({ name, icon, displayURL, newTab, url }, index) => (
        <Item key={[name, index].join("")}>
          <App
            name={name}
            icon={icon}
            url={url}
            displayURL={displayURL}
            newTab={newTab}
          />
        </Item>
      ))}
    </ItemList>
  </CategoryContainer>
);

export default AppCategory;
