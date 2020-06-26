import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import selectedTheme from './themeManager';

import {
    handleResponse,
    Headline,
    SubHeadline,
    ListContainer,
    ItemList,
    Item,
    ErrorMessage,
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

const CategoryContainer = styled.div`
    padding: 1rem 0;
`;

const App = styled.div`
    display: flex;
    flex: auto 25%;
    padding: 1rem;
`;

const useAppData = () => {
    const [appData, setAppData] = useState({ apps: [], error: false });
    const fetchAppData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/data/apps.json').then(handleResponse)
            : import('./data/apps.json')
        )
            .then((jsonResponse) => {
                setAppData({ ...jsonResponse, error: false });
            })
            .catch((error) => {
                setAppData({ categories: [], apps: [], error: error.message });
            });
    }, []);

    useEffect(() => {
        fetchAppData();
    }, [fetchAppData]);
    return { appData, fetchAppData };
};

const AppList = () => {
    const {
        appData: { categories, apps, error },
    } = useAppData();
    return (
        <ListContainer>
            <Headline>Applications</Headline>

            {categories && (
                <CategoryContainer>
                    {categories.map((category, idx) => (
                        <>
                            <SubHeadline key={[category.name, idx].join('')}>
                                {category.name}
                            </SubHeadline>
                            <ItemList>
                                {category.items.map((app, idx) => (
                                    <Item key={[app.name, idx].join('')}>
                                        <App>
                                            <IconContainer>
                                                <MaterialIcon
                                                    icon={app.icon}
                                                    color={
                                                        selectedTheme.mainColor
                                                    }
                                                />
                                            </IconContainer>
                                            <DetailsContainer>
                                                <Link href={app.URL}>
                                                    {app.name}
                                                </Link>
                                                <Description>
                                                    {app.displayURL}
                                                </Description>
                                            </DetailsContainer>
                                        </App>
                                    </Item>
                                ))}
                            </ItemList>
                        </>
                    ))}
                </CategoryContainer>
            )}

            <ItemList>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {apps.map((app, idx) => (
                    <Item key={[app.name, idx].join('')}>
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
                ))}
            </ItemList>
        </ListContainer>
    );
};

export default AppList;
