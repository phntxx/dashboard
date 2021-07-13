import Icon from "./icon";
import styled from "styled-components";
import selectedTheme from "../lib/useTheme";
import {
  Headline,
  ListContainer,
  ItemList,
  Item,
  SubHeadline,
} from "./elements";

const AppContainer = styled.a`
  display: flex;
  flex: 1 0 auto;
  padding: 1rem;
  color: ${selectedTheme.mainColor};
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  text-decoration: none;
  font-size: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  a:hover {
    text-decoration: underline;
  }
`;

const AppDescription = styled.p`
  text-transform: uppercase;
  margin: 0;
  font-size: 0.65rem;
  font-weight: 400;
  color: ${selectedTheme.accentColor};
`;

const CategoryHeadline = styled(SubHeadline)`
  padding-top: 1rem;
`;

const CategoryContainer = styled.div`
  width: 100%;
`;

export interface IAppProps {
  name: string;
  icon: string;
  url: string;
  displayURL: string;
  newTab?: boolean;
}

export interface IAppCategoryProps {
  name: string;
  items: Array<IAppProps>;
}

export interface IAppListProps {
  categories?: Array<IAppCategoryProps>;
  apps?: Array<IAppProps>;
}

export const defaults: IAppListProps = {
  categories: [],
  apps: [],
};

/**
 * Renders a single app shortcut
 * @param {IAppProps} props the props of the given app
 * @returns {React.ReactNode} the child node for the given app
 */
export const App = ({ name, icon, url, displayURL, newTab }: IAppProps) => {
  const linkAttrs =
    newTab !== undefined && newTab
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <AppContainer href={url} {...linkAttrs}>
      <IconContainer>
        <Icon name={icon} />
      </IconContainer>
      <DetailsContainer>
        <AppName>{name}</AppName>
        <AppDescription>{displayURL}</AppDescription>
      </DetailsContainer>
    </AppContainer>
  );
};

/**
 * Renders one app category
 * @param {IAppCategoryProps} props props of the given category
 * @returns {React.ReactNode} the app category node
 */
export const AppCategory = ({ name, items }: IAppCategoryProps) => (
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

/**
 * Renders one list containing all app categories and uncategorized apps
 * @param {IAppListProps} props props of the given list of apps
 * @returns {React.ReactNode} the app list component
 */
export const AppList = ({ categories, apps }: IAppListProps) => {
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
