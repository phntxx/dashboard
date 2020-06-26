import React from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';
import selectedTheme from './themeManager';

const AppContainer = styled.div`
    display: flex;
    flex: auto 25%;
    padding: 1rem;
`;

const IconContainer = styled.div`
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

export const App = ({ name, icon, url, displayURL }) => (
    <AppContainer>
        <IconContainer>
            <MaterialIcon icon={icon} color={selectedTheme.mainColor} />
        </IconContainer>
        <DetailsContainer>
            <AppLink href={url}>{name}</AppLink>
            <AppDescription>{displayURL}</AppDescription>
        </DetailsContainer>
    </AppContainer>
);
