import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import selectedTheme from './themeManager';

import {
    Headline,
    ListContainer,
    ItemList,
    Item,
    RefreshButton,
    ErrorMessage
} from './elements';

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

const handleResponse = response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to load app data.');
};

const useAppData = () => {
    const [appData, setAppData] = useState({ apps: [], error: false });
    const fetchAppData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/apps.json').then(handleResponse)
            : import('./data/apps.json')
        )
            .then(jsonResponse => {
                setAppData({ ...jsonResponse, error: false });
            })
            .catch(error => {
                setAppData({ apps: [], error: error.message });
            });
    }, []);

    useEffect(() => {
        fetchAppData();
    }, [fetchAppData]);
    return { appData, fetchAppData };
};

const AppList = () => {
    const {
        appData: { apps, error },
        fetchAppData
    } = useAppData();
    return (
        <ListContainer>
            <Headline>Applications</Headline>
            <RefreshButton onClick={fetchAppData}>refresh</RefreshButton>
            <ItemList>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {apps.map((app, idx) => {
                    const { name } = app;
                    return (
                        <Item key={[name, idx].join('')}>
                            <App>
                                <IconContainer>
                                    <MaterialIcon
                                        icon={app.icon}
                                        color={selectedTheme.mainColor}
                                    />
                                </IconContainer>
                                <DetailsContainer>
                                    <Link href={app.URL}>{app.name}</Link>
                                    <Description>{app.displayURL}</Description>
                                </DetailsContainer>
                            </App>
                        </Item>
                    );
                })}
            </ItemList>
        </ListContainer>
    );
};

export default AppList;
