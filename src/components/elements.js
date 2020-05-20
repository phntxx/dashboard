import styled from 'styled-components';
import getTheme from './themeManager';

const selectedTheme = getTheme();

const ListContainer = styled.div`
    padding: 2rem 0 2rem 0;
`;

const Headline = styled.h3`
    font-family: Roboto, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;
    font-size: 1.5rem;
    color: ${selectedTheme.mainColor};
`;

const ItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 0;
    list-style: none;
`;

const Item = styled.li`
    max-height: 100px;
    overflow: hidden;
    position: relative;
    list-style: none;
`;

export { Headline, ListContainer, ItemList, Item }