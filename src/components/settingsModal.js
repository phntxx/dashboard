import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Select from 'react-select';

import searchData from './data/search.json';

import selectedTheme, { setTheme } from './themeManager';
import { Button, IconButton, ErrorMessage } from './elements';

const Modal = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 1rem;
    transform: translate(-50%, -50%);
    z-index: 10;
    border: 1px solid ${selectedTheme.mainColor};
    background-color: ${selectedTheme.backgroundColor};
`;

const SelectContainer = styled.div`
    padding-bottom: 1rem;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

const Headline = styled.h3`
    font-family: Roboto, sans-serif;
    font-weight: 900;
    color: ${selectedTheme.mainColor};
    margin-top: 0;
`;

const Table = styled.table`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    background: none;
    color: ${selectedTheme.mainColor};
`;

const TableRow = styled.tr`
    border-bottom: 1px solid ${selectedTheme.mainColor};
`;

const TableCell = styled.td`
    background: none;
    padding-top: 0.5rem;
`;

const HeadCell = styled.th`
    font-weight: 700;
    background: none;
`;

const SelectorStyle = {
    control: provided => ({
        ...provided,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
        color: selectedTheme.mainColor,
        textTransform: 'uppercase',
        width: '200px',
        background: 'none',
        borderRadius: '0px',
        border: '1px solid ' + selectedTheme.mainColor,
        boxShadow: 0,
        '&:hover': {
            border: '1px solid ' + selectedTheme.mainColor
        }
    }),
    menu: provided => ({
        ...provided,
        backgroundColor: selectedTheme.backgroundColor,
        border: '1px solid ' + selectedTheme.mainColor,
        borderRadius: '0px',
        boxShadow: 0
    }),
    option: provided => ({
        ...provided,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
        color: selectedTheme.mainColor,
        textTransform: 'uppercase',
        borderRadius: '0px',
        boxShadow: 0,
        backgroundColor: selectedTheme.backgroundColor,
        '&:hover': {
            backgroundColor: selectedTheme.mainColor,
            color: selectedTheme.backgroundColor
        }
    }),
    singleValue: provided => {
        return {
            ...provided,
            color: selectedTheme.mainColor
        };
    }
};

const handleResponse = response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to load app data.');
};

const useThemeData = () => {
    const [themeData, setThemeData] = useState({ themes: [], error: false });
    const fetchThemeData = useCallback(() => {
        (process.env.NODE_ENV === 'production'
            ? fetch('/themes.json').then(handleResponse)
            : import('./data/themes.json')
        )
            .then(jsonResponse => {
                setThemeData({ ...jsonResponse, error: false });
            })
            .catch(error => {
                setThemeData({ themes: [], error: error.message });
            });
    }, []);

    useEffect(() => {
        fetchThemeData();
    }, [fetchThemeData]);
    return { themeData, fetchThemeData };
};

const SettingsModal = () => {
    const [modalHidden, setModalHidden] = useState(true);
    const [newTheme, setNewTheme] = useState();

    const {
        themeData: { themes, error },
        fetchThemeData
    } = useThemeData();

    return (
        <>
            <IconButton
                icon="settings"
                onClick={() => setModalHidden(!modalHidden)}
            />
            <Modal hidden={modalHidden}>
                <IconButton
                    icon="close"
                    onClick={() => setModalHidden(!modalHidden)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SelectContainer>
                    <Headline>Theme:</Headline>
                    <FormContainer>
                        <Select
                            options={themes}
                            defaultValue={selectedTheme}
                            onChange={e => {
                                setNewTheme(e);
                            }}
                            styles={SelectorStyle}
                        />
                        <Button onClick={fetchThemeData}>Refresh</Button>
                        <Button
                            onClick={() => setTheme(JSON.stringify(newTheme))}
                        >
                            Apply
                        </Button>
                    </FormContainer>
                </SelectContainer>
                <Table>
                    <tbody>
                        <TableRow>
                            <HeadCell>Search Provider</HeadCell>
                            <HeadCell>Prefix</HeadCell>
                        </TableRow>
                        {searchData.providers.map((provider, index) => (
                            <TableRow key={provider.name + index}>
                                <TableCell>{provider.name}</TableCell>
                                <TableCell>{provider.prefix}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </Modal>
        </>
    );
};

export default SettingsModal;
