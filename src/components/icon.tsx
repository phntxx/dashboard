import React from "react";
import styled from "styled-components";
import selectedTheme from "../lib/theme";

interface IIconProps {
  name: string;
  size?: string;
}

export const Icon = ({ name, size }: IIconProps) => {

  let IconContainer = styled.i`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: ${size ? size : "24px"};
  color: ${selectedTheme.mainColor};
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
`;

  return <IconContainer>{name}</IconContainer>;
};

export default Icon;
