import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import selectedTheme from './themeManager';

import {
    handleResponse,
    Headline,
    ListContainer,
    ItemList,
    Item,
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

    &:hover {
        text-decoration: underline;
    }
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
