import React, { useState } from "react";
import styled from "styled-components";

import Select from "react-select";

import { ISearchProviderProps } from "./searchBar";
import selectedTheme, { setTheme, IThemeProps } from "./themeManager";
import { Button, Headline as hl } from "./elements";

import Modal from "./modal";

const Headline = styled(hl)`
  padding: 0.5rem 0;
`;

const SelectContainer = styled.div`
  padding-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Table = styled.table`
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
  control: (provided: any) => ({
    ...provided,
    fontWeight: "500",
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    width: "12rem",
    background: "none",
    borderRadius: "0px",
    border: "1px solid " + selectedTheme.mainColor,
    boxShadow: 0,
    "&:hover": {
      border: "1px solid " + selectedTheme.mainColor,
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: selectedTheme.backgroundColor,
    border: "1px solid " + selectedTheme.mainColor,
    borderRadius: 0,
    boxShadow: 0,
  }),
  option: (provided: any) => ({
    ...provided,
    fontWeight: "500",
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    borderRadius: 0,
    boxShadow: 0,
    backgroundColor: selectedTheme.backgroundColor,
    "&:hover": {
      backgroundColor: selectedTheme.mainColor,
      color: selectedTheme.backgroundColor,
    },
  }),
  singleValue: (provided: any) => {
    return {
      ...provided,
      color: selectedTheme.mainColor,
    };
  },
};

interface ISettingsProps {
  themes: Array<IThemeProps> | undefined;
  providers: Array<ISearchProviderProps> | undefined;
}

const Settings = ({ themes, providers }: ISettingsProps) => {
  const [newTheme, setNewTheme] = useState();

  if (themes && providers) {
    return (
      <Modal element="icon" icon="settings">
        {themes && (
          <SelectContainer>
            <Headline>Theme:</Headline>
            <FormContainer>
              <Select
                options={themes}
                defaultValue={selectedTheme}
                onChange={(e: any) => {
                  setNewTheme(e);
                }}
                styles={SelectorStyle}
              />

              <Button onClick={() => setTheme(JSON.stringify(newTheme))}>
                Apply
              </Button>
              <Button onClick={() => window.location.reload()}>Refresh</Button>
            </FormContainer>
          </SelectContainer>
        )}
        {providers && (
          <Table>
            <tbody>
              <TableRow>
                <HeadCell>Search Provider</HeadCell>
                <HeadCell>Prefix</HeadCell>
              </TableRow>
              {providers.map((provider, index) => (
                <TableRow key={provider.name + index}>
                  <TableCell>{provider.name}</TableCell>
                  <TableCell>{provider.prefix}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default Settings;
