import React, { useCallback, useEffect, useState } from 'react';

import {
    handleResponse,
    Headline,
    ListContainer,
    ItemList,
    ErrorMessage,
} from './elements';

import { BookmarkGroup } from './bookmarkGroup';

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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ItemList>
                {groups.map(({ name, items }, idx) => (
                    <BookmarkGroup
                        key={[name, idx].join('')}
                        name={name}
                        items={items}
                    />
                ))}
            </ItemList>
        </ListContainer>
    );
};

export default BookmarkList;
