import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import { Button } from './button';
import { selectedTheme } from '../selectedTheme';

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

const ErrorMessage = styled.p`
    color: red;
`;

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to load app data.');
}

function useAppData() {
    const [appData, setAppData] = useState({ apps: [], error: false });
    const fetchAppData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/apps.json').then(handleResponse)
            : import('./data/apps.json')
        )
            .then((jsonResponse) => {
                setAppData({ ...jsonResponse, error: false });
            })
            .catch((error) => {
                setAppData({ apps: [], error: error.message });
            });
    }, []);
    useEffect(() => {
        fetchAppData();
    }, [fetchAppData]);
    return { appData, fetchAppData };
}

const AppList = () => {
    const {
        appData: { apps, error },
        fetchAppData,
    } = useAppData();
    return (
        <AppListContainer>
            <ApplicationsText>
                Applications <Button onClick={fetchAppData}>refresh</Button>
            </ApplicationsText>
            <AppsContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {apps.map((app, idx) => {
                    const { name } = app;
                    return (
                        <AppContainer key={[name, idx].join('')}>
                            <IconContainer>
                                <MaterialIcon
                                    icon={app.icon}
                                    color={selectedTheme.mainColor}
                                />
                            </IconContainer>
                            <AppDetails>
                                <Link href={app.URL}>{app.name}</Link>
                                <Description>{app.displayURL}</Description>
                            </AppDetails>
                        </AppContainer>
                    );
                })}
            </AppsContainer>
        </AppListContainer>
    );
};

export default AppList;
