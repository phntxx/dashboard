import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ErrorMessage } from './elements';

import selectedTheme from './themeManager';

const SearchInput = styled.input`
    width: 100%;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid ${selectedTheme.accentColor};
    background: none;
    border-radius: 0;
    color: ${selectedTheme.mainColor};
`;

const handleResponse = response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to load app data.');
};

const useSearchProviders = () => {
    const [searchProviders, setSearchProviders] = useState({
        providers: [],
        error: false
    });
    const fetchSearchProviders = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/search.json').then(handleResponse)
            : import('./data/search.json')
        )
            .then(jsonResponse => {
                setSearchProviders({ ...jsonResponse, error: false });
            })
            .catch(error => {
                setSearchProviders({ providers: [], error: error.message });
            });
    }, []);

    useEffect(() => {
        fetchSearchProviders();
    }, [fetchSearchProviders]);
    return searchProviders;
};

const SearchBar = () => {
    const searchProviders = useSearchProviders();

    let [input, setInput] = useState();

    const handleSearchQuery = e => {
        var query = input;

        if (query.split(' ')[0].includes('/')) {
            handleQueryWithProvider(query);
        } else {
            window.location = 'https://google.com/search?q=' + query;
        }

        e.preventDefault();
    };

    const handleQueryWithProvider = query => {
        let queryArray = query.split(' ');
        let prefix = queryArray[0];
        queryArray.shift();

        let searchQuery = queryArray.join(' ');

        var foundProvider = false;
        searchProviders.providers.forEach(provider => {
            if (provider.prefix === prefix) {
                foundProvider = true;
                window.location = provider.url + searchQuery;
            }
        });

        if (!foundProvider) {
            window.location = 'https://google.com/search?q=' + query;
        }
    };

    return (
        <form onSubmit={e => handleSearchQuery(e)}>
            {searchProviders.error && (
                <ErrorMessage>{searchProviders.error}</ErrorMessage>
            )}
            <SearchInput
                type="text"
                onChange={e => setInput(e.target.value)}
            ></SearchInput>
            <button type="submit" hidden />
        </form>
    );
};

export default SearchBar;
