import React, { useEffect } from "react";
import Icon from "./icon";
import styled from "styled-components";
import selectedTheme from "../lib/theme";

const AppContainer = styled.div`
  display: flex;
  flex: auto 25%;
  padding: 1rem;
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

const AppLink = styled.a`
  flex: 1 0 auto;
  color: ${selectedTheme.mainColor};
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
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

export interface IAppProps {
  name: string;
  icon: string;
  url: string;
  displayURL: string;
  newTab?: boolean;
}

/**
 * Renders a single app shortcut
 * @param {IAppProps} props - The props of the given app
 */
export const App = ({ name, icon, url, displayURL, newTab }: IAppProps) => {

  useEffect(() => { console.log(newTab) }, [newTab])

  return (
    <AppContainer>
      <IconContainer>
        <Icon name={icon} />
      </IconContainer>
      <DetailsContainer>

        {
          (newTab !== undefined && newTab) ?
            <AppLink href={url} target="_blank" rel="noopener noreferrer">{name}</AppLink> : <AppLink href={url}>{name}</AppLink>
        }

        <AppDescription>{displayURL}</AppDescription>
      </DetailsContainer>
    </AppContainer>
  );
}
