import React from "react";
import styled from "styled-components";
import { App, IAppProps } from "./app";
import { ItemList, Item, SubHeadline } from "./elements";

const CategoryHeadline = styled(SubHeadline)`
  padding-top: 1rem;
`;

const CategoryContainer = styled.div`
  width: 100%;
`;

interface IAppCategoryProps {
  name: string;
  items: Array<IAppProps>;
}

export const AppCategory = ({ name, items }: IAppCategoryProps) => (
  <CategoryContainer>
    {name && <CategoryHeadline>{name}</CategoryHeadline>}
    <ItemList>
      {items.map((app, idx) => (
        <Item key={[app.name, idx].join("")}>
          <App
            name={app.name}
            icon={app.icon}
            URL={app.URL}
            displayURL={app.displayURL}
          />
        </Item>
      ))}
    </ItemList>
  </CategoryContainer>
);
