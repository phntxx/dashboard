import AppCategory, { IAppCategoryProps } from "./appCategory";
import { IAppProps } from "./app";

import { Headline, ListContainer } from "./elements";

export interface IAppListProps {
  categories?: Array<IAppCategoryProps>;
  apps?: Array<IAppProps>;
}

/**
 * Renders one list containing all app categories and uncategorized apps
 * @param {IAppListProps} props props of the given list of apps
 * @returns {React.ReactNode} the app list component
 */
const AppList = ({ categories, apps }: IAppListProps) => {
  if (apps || categories) {
    return (
      <ListContainer>
        <Headline>Applications</Headline>
        {categories &&
          categories.map(({ name, items }, index) => (
            <AppCategory
              key={[name, index].join("")}
              name={name}
              items={items}
            />
          ))}
        {apps && (
          <AppCategory
            name={categories ? "Uncategorized apps" : ""}
            items={apps}
          />
        )}
      </ListContainer>
    );
  } else {
    return <></>;
  }
};

export default AppList;
