import React from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import appData from './data/apps.json';

import themeData from './data/themes.json'
const selectedTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : themeData.themes[0];

const AppListContainer = styled.div`
    padding: 2rem 0 2rem 0;
`;

const AppsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 21%;
    padding: 1rem 0 1rem 0;

    @media (max-width: 750px) {
        flex: 1 0 42%;
    }
`;

const IconContainer = styled.div`
    margin-right: 5px;
`;

const AppDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const ApplicationsText = styled.h3`
    font-family: Roboto, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;
    font-size: 20px;
    color: ${selectedTheme.mainColor};
`;

const Link = styled.a`
    font-family: Roboto, sans-serif;
    color: ${selectedTheme.mainColor};
    font-weight: 500;
    text-transform: uppercase;
    margin: 0px;
    text-decoration: none;
    font-size: 15px;
`;

const Description = styled.p`
    font-family: Roboto, sans-serif;
    text-transform: uppercase;
    margin: 0px;
    font-size: 10px;
    font-weight: 400;
    color: ${selectedTheme.accentColor};
`;

const appList = () => (
    <AppListContainer>
        <ApplicationsText>Applications</ApplicationsText>
        <AppsContainer>
        {
            appData.apps.map((app) => (
                <AppContainer>
                    <IconContainer>
                        <MaterialIcon icon={app.icon} color={selectedTheme.mainColor}/>
                    </IconContainer>
                    <AppDetails>
                        <Link href={app.URL}>{app.name}</Link>
                        <Description>{app.displayURL}</Description>
                    </AppDetails>
                </AppContainer>
            ))
        }
        </AppsContainer>
    </AppListContainer>
);

export default appList;