import React, { useState } from 'react';
import styled from 'styled-components';

import Select from 'react-select';

import searchData from './data/search.json';
import themeData from './data/themes.json';

import selectedTheme, { setTheme } from './themeManager';
import { Button, IconButton } from './elements';

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

const SettingsModal = () => {
    const [modalHidden, setModalHidden] = useState(true);
    const [newTheme, setNewTheme] = useState();

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
                <SelectContainer>
                    <Headline>Theme:</Headline>
                    <FormContainer>
                        <Select
                            options={themeData.themes}
                            defaultValue={selectedTheme}
                            onChange={e => {
                                setNewTheme(e);
                            }}
                            styles={SelectorStyle}
                        />
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
