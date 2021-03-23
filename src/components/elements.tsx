import React from "react";
import styled from "styled-components";
import selectedTheme from "../lib/theme";
import Icon from "./icon";

export const ListContainer = styled.div`
  padding: 2rem 0;
`;

export const Headline = styled.h2`
  display: inline-block;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  font-size: 1.5rem;
  color: ${selectedTheme.mainColor};
`;

export const SubHeadline = styled.h3`
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: ${selectedTheme.mainColor};
`;

export const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 0;
  list-style: none;

  @media (max-width: 750px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const Item = styled.li`
  overflow: hidden;
  position: relative;
  list-style: none;
`;

export const Button = styled.button`
  text-transform: uppercase;
  font-weight: 400;
  border: 1px solid ${selectedTheme.mainColor};
  color: ${selectedTheme.mainColor};
  background: none;

  min-height: 2rem;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  float: right;
  border: none;
  padding: 0;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;

interface IIconButtonProps {
  icon: string;
  onClick: (e: React.FormEvent) => void;
}

/**
 * Renders a button with an icon
 * @param {IIconProps} props - The props of the given IconButton
 */
export const IconButton = ({ icon, onClick }: IIconButtonProps) => (
  <StyledButton onClick={onClick}>
    <Icon name={icon} />
  </StyledButton>
);
