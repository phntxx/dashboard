import React from "react";
import styled from "styled-components";

interface IIconProps {
  name: string;
  size?: string;
}

interface IIconButtonProps {
  testid?: string;
  icon: string;
  onClick: (e: React.FormEvent) => void;
}

const StyledButton = styled.button`
  float: right;
  border: none;
  padding: 0;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;

const IconContainer = styled.i`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga";
  font-size: ${(props) => props.about};
  color: ${(props) => props.theme.mainColor};
`;

/**
 * Renders an Icon
 * @param {IIconProps} props props needed for the given icon
 * @returns {React.ReactNode} the icon node
 */
export const Icon = ({ name, size }: IIconProps) => (
  <IconContainer about={size}>{name}</IconContainer>
);

/**
 * Renders a button with an icon
 * @param {IIconProps} props - The props of the given IconButton
 * @returns {React.ReactNode} the icon button node
 */
export const IconButton = ({ testid, icon, onClick }: IIconButtonProps) => (
  <StyledButton data-testid={testid} onClick={onClick}>
    <Icon name={icon} />
  </StyledButton>
);

export default Icon;
