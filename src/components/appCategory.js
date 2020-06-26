import React from 'react';
import styled from 'styled-components';
import { App } from './app';
import { ItemList, Item, SubHeadline } from './elements';

const CategoryHeadline = styled(SubHeadline)`
    padding-top: 1rem;
    font-size: 1.25rem;
`;

const CategoryContainer = styled.div`
    width: 100%;
`;

export const AppCategory = ({ name, items }) => (
    <CategoryContainer>
        {name && <CategoryHeadline>{name}</CategoryHeadline>}
        <ItemList>
            {items.map((app, idx) => (
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
    </CategoryContainer>
);
