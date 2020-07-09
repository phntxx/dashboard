import React from "react";
import styled from "styled-components";
import selectedTheme from "./themeManager";

export const RawIcon = styled.i`
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
`;

interface IIconProps {
  name: string;
  size?: string;
}

export const ComponentIcon = ({ name, size }: IIconProps) => {
  let IconContainer = styled(RawIcon)`
    font-size: ${size ? size : "24px"};
    text-color: ${selectedTheme.mainColor};
  `;

  return <IconContainer>{name}</IconContainer>;
};

export default ComponentIcon;
