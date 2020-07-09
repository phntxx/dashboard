import React from "react";
import styled from "styled-components";
import selectedTheme from "./themeManager";
import Icon from "./icon";

// File for elements that are/can be reused across the entire site.

export const handleResponse = (response: any) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to load data.");
};

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
  text-transform: uppercase;
  font-weight: 400;
  border: 1px solid ${selectedTheme.mainColor};
  color: ${selectedTheme.mainColor};
  background: none;
  min-height: 3em;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  float: right;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;

export const RefreshButton = styled(Button)`
  display: relative;
  top: 0;
  float: right;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

interface IIconButtonProps {
  icon: String;
  onClick: any;
}

export const IconButton = ({ icon, onClick }: IIconButtonProps) => {
  let StyledIcon = styled(Icon)`
    text-color: ${selectedTheme.mainColor};
  `;

  return (
    <StyledButton onClick={onClick}>
      <StyledIcon>{icon}</StyledIcon>
    </StyledButton>
  );
};
