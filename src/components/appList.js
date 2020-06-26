import React, { useCallback, useEffect, useState } from 'react';
import { App } from './app';
import { Category } from './category';

import {
    handleResponse,
    Headline,
    ListContainer,
    ItemList,
    Item,
    ErrorMessage,
} from './elements';

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

            {categories &&
                categories.map((category, idx) => (
                    <Category
                        key={[category.name, idx].join('')}
                        name={category.name}
                        items={category.items}
                    />
                ))}

            <ItemList>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {apps.map((app, idx) => (
                    <Item key={[app.name, idx].join('')}>
                        <App
                            name={app.name}
                            icon={app.icon}
                            url={app.url}
                            displayURL={app.displayURL}
                        />
                    </Item>
                ))}
            </ItemList>
        </ListContainer>
    );
};

export default AppList;
