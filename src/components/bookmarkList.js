import React from 'react';
import styled from 'styled-components';

import bookmarkData from './data/bookmarks.json';

import { selectedTheme } from '../selectedTheme';

const BookmarksText = styled.h3`
    font-family: Roboto, sans-serif;
    text-transform: uppercase;
    margin: 0;
    font-size: 20px;
    color: ${selectedTheme.mainColor};
`;

const GroupText = styled.h4`
    font-family: Roboto, sans-serif;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    color: ${selectedTheme.mainColor};
`;

const BookmarkListContainer = styled.div`
    padding: 2rem 0 2rem 0;
`;

const BookmarksContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const BookmarkGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 21%;
    padding-top: 2rem;
    font-size: 15px;
`;

const Bookmark = styled.a`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    text-decoration: none;
    color: ${selectedTheme.accentColor};
    padding: 10px 0 0 0;
    font-size: 14px;
`;

const BookmarkList = () => (
    <BookmarkListContainer>
        <BookmarksText>Bookmarks</BookmarksText>
        <BookmarksContainer>
            {bookmarkData.groups.map(({ name, items }) => {
                return (
                    <BookmarkGroupContainer key={name}>
                        <GroupText>{name}</GroupText>
                        {items.map(({ url, name: linkName }) => (
                            <Bookmark key={linkName} href={url}>
                                {linkName}
                            </Bookmark>
                        ))}
                    </BookmarkGroupContainer>
                );
            })}
        </BookmarksContainer>
    </BookmarkListContainer>
);

export default BookmarkList;
