import React from "react";
import MaterialIcon from "material-icons-react";
import styled from "styled-components";

import appData from "./data/apps.json";

import selectedTheme from "./themeManager";

import { Headline, ListContainer, ItemList, Item } from "./elements";

const IconContainer = styled.div`
  margin-right: 0.5vh;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  font-family: Roboto, sans-serif;
  flex: 1 0 auto;
  color: ${selectedTheme.mainColor};
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  text-decoration: none;
  font-size: 1rem;
`;

const Description = styled.p`
  font-family: Roboto, sans-serif;
  text-transform: uppercase;
  margin: 0;
  font-size: 0.65rem;
  font-weight: 400;
  color: ${selectedTheme.accentColor};
`;

const App = styled.div`
  display: flex;
  flex-basis: 25%;
  padding: 1rem;
`;

const appList = () => (
  <ListContainer>
    <Headline>Applications</Headline>
    <ItemList>
      {appData.apps.map((app, index) => (
        <Item key={app.name + index}>
          <App>
            <IconContainer>
              <MaterialIcon icon={app.icon} color={selectedTheme.mainColor} />
            </IconContainer>
            <DetailsContainer>
              <Link href={app.URL}>{app.name}</Link>
              <Description>{app.displayURL}</Description>
            </DetailsContainer>
          </App>
        </Item>
      ))}
    </ItemList>
  </ListContainer>
);

export default appList;
