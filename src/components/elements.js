import React from 'react';
import styled from 'styled-components';
import selectedTheme from './themeManager';
import MaterialIcon from 'material-icons-react';

// File for elements that are/can be reused across the entire site.

export const ListContainer = styled.div`
    padding: 2rem 0 2rem 0;
`;

export const Headline = styled.h3`
    display: inline-block;
    font-family: Roboto, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;
    font-size: 1.5rem;
    color: ${selectedTheme.mainColor};
`;

export const ItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    overflow: hidden;
    position: relative;
    list-style: none;
`;

export const Button = styled.button`
    font-family: Roboto, sans-serif;
    text-transform: uppercase;
    font-weight: 400;
    border: 1px solid ${selectedTheme.mainColor};
    color: ${selectedTheme.mainColor};
    background: none;
    margin-left: 1rem;
    min-height: 3em;
`;

const StyledButton = styled.button`
    float: right;
    border: none;
    background: none;
`;

export const RefreshButton = styled(Button)`
    display: relative;
    top: 0;
    float: right;
`;

export const ErrorMessage = styled.p`
    color: red;
`;

export const IconButton = props => {
    if (
        props.icon &&
        props.icon !== '' &&
        props.icon !== undefined &&
        props.onClick &&
        props.onClick !== '' &&
        props.onClick !== undefined
    ) {
        return (
            <StyledButton onClick={props.onClick}>
                <MaterialIcon
                    icon={props.icon}
                    color={selectedTheme.mainColor}
                />
            </StyledButton>
        );
    }
};
