import styled from 'styled-components';
import { selectedTheme } from '../selectedTheme';

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
