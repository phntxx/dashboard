import React, { useCallback, useEffect, useState } from 'react';
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

const BookmarkGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2 1 auto;
    padding: 1rem 0;
`;

const Bookmark = styled.a`
    font-weight: 400;
    text-decoration: none;
    color: ${selectedTheme.accentColor};
    padding-top: 10px;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`;

const useBookmarkData = () => {
    const [bookmarkData, setBookmarkData] = useState({
        groups: [],
        error: false,
    });

    const fetchBookmarkData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/data/bookmarks.json').then(handleResponse)
            : import('./data/bookmarks.json')
        )
            .then((jsonResponse) => {
                setBookmarkData({ ...jsonResponse, error: false });
            })
            .catch((error) => {
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
                                <SubHeadline>{group.name}</SubHeadline>
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
