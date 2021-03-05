import React from "react";
import { AppCategory, IAppCategoryProps } from "./appCategory";
import { IAppProps } from "./app";

import { Headline, ListContainer } from "./elements";

export interface IAppListProps {
  categories: Array<IAppCategoryProps>;
  apps: Array<IAppProps>;
}

const AppList = ({ categories, apps }: IAppListProps) => {
  return (
    <ListContainer>
      <Headline>Applications</Headline>
      {categories &&
        categories.map(({ name, items }, idx) => (
          <AppCategory key={[name, idx].join("")} name={name} items={items} />
        ))}
      {apps && (
        <AppCategory
          name={categories ? "Uncategorized apps" : ""}
          items={apps}
        />
      )}
    </ListContainer>
  );
};

export default AppList;
