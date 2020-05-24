import React, { useCallback, useEffect, useState } from 'react';
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

const Group = styled.h4`
    font-family: Roboto, sans-serif;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    color: ${selectedTheme.mainColor};
`;

const BookmarkGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2 1 auto;
    padding: 1rem 0 1rem 0;
`;

const Bookmark = styled.a`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    text-decoration: none;
    color: ${selectedTheme.accentColor};
    padding: 10px 0 0 0;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`;

const useBookmarkData = () => {
    const [bookmarkData, setBookmarkData] = useState({
        groups: [],
        error: false
    });

    const fetchBookmarkData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/bookmarks.json').then(handleResponse)
            : import('./data/bookmarks.json')
        )
            .then(jsonResponse => {
                setBookmarkData({ ...jsonResponse, error: false });
            })
            .catch(error => {
                setBookmarkData({ groups: [], error: error.message });
            });
    }, []);

    useEffect(() => {
        fetchBookmarkData();
    }, [fetchBookmarkData]);
    return { bookmarkData, fetchBookmarkData };
};

const BookmarkList = () => {
    const {
        bookmarkData: { groups, error },
        fetchBookmarkData
    } = useBookmarkData();
    return (
        <ListContainer>
            <Headline>Bookmarks</Headline>
            <ItemList>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {groups.map((group, idx) => {
                    return (
                        <Item key={[group.name, idx].join('')}>
                            <BookmarkGroup>
                                <Group>{group.name}</Group>
                                {group.items.map(({ url, name: linkName }) => (
                                    <Bookmark key={linkName} href={url}>
                                        {linkName}
                                    </Bookmark>
                                ))}
                            </BookmarkGroup>
                        </Item>
                    );
                })}
            </ItemList>
        </ListContainer>
    );
};

export default BookmarkList;
