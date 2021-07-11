import Icon from "./icon";
import styled from "styled-components";

const AppContainer = styled.a`
  display: flex;
  flex: 1 0 auto;
  padding: 1rem;
  color: ${(props) => props.theme.mainColor};
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
  color: ${(props) => props.theme.accentColor};
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
 * @param {IAppProps} props the props of the given app
 * @returns {React.ReactNode} the child node for the given app
 */
const App = ({ name, icon, url, displayURL, newTab }: IAppProps) => {
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

export default App;
