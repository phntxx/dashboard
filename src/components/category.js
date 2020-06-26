import React from 'react';
import styled from 'styled-components';
import { App } from './app';
import { ItemList, Item, SubHeadline } from './elements';

const CategoryHeadline = styled(SubHeadline)`
    font-size: 1.25rem;
`;

const CategoryContainer = styled.div`
    width: 100%;
    padding-top: 1rem;
`;

export const Category = ({ name, items }) => (
    <CategoryContainer>
        <CategoryHeadline>{name}</CategoryHeadline>
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
