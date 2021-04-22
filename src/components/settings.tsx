import React, { useState } from "react";
import styled from "styled-components";

import Select, { ValueType } from "react-select";

import { ISearchProps } from "./searchBar";
import selectedTheme, { setTheme, IThemeProps } from "../lib/theme";
import { Button, SubHeadline } from "./elements";

import Modal from "./modal";

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Table = styled.table`
  font-weight: 400;
  background: none;
  width: 100%;
  color: ${selectedTheme.mainColor};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${selectedTheme.mainColor};
`;

const TableCell = styled.td`
  padding-top: 0.5rem;
`;

const HeadCell = styled.th`
  font-weight: 700;
  text-align: left;
`;

const Section = styled.div`
  padding: 1rem 0;
`;

const SectionHeadline = styled(SubHeadline)`
  width: 100%;
  border-bottom: 1px solid ${selectedTheme.accentColor};
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-weight: 700;
  color: ${selectedTheme.accentColor};
`;

const Code = styled.p`
  font-family: monospace;
  color: ${selectedTheme.accentColor};
`;

const SelectorStyle: any = {
  container: (base: any): any => ({
    ...base,
    margin: "0 2px",
  }),
  control: (base: any): any => ({
    ...base,
    fontWeight: 500,
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    width: "12rem",
    background: "none",
    borderRadius: 0,
    border: "1px solid",
    borderColor: selectedTheme.mainColor,
    boxShadow: "none",
    "&:hover": {
      border: "1px solid",
      borderColor: selectedTheme.mainColor
    },
  }),
  dropdownIndicator: (base: any): any => ({
    ...base,
    color: selectedTheme.mainColor,
    "&:hover": {
      color: selectedTheme.mainColor
    }
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base: any): any => ({
    ...base,
    backgroundColor: selectedTheme.backgroundColor,
    border: "1px solid " + selectedTheme.mainColor,
    borderRadius: 0,
    boxShadow: "none",
    margin: "4px 0"
  }),
  option: (base: any): any => ({
    ...base,
    fontWeight: 500,
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: selectedTheme.backgroundColor,
    "&:hover": {
      backgroundColor: selectedTheme.mainColor,
      color: selectedTheme.backgroundColor,
    },
  }),
  singleValue: (base: any): any => ({
    ...base,
    color: selectedTheme.mainColor,
  }),
};

interface ISettingsProps {
  themes: Array<IThemeProps> | undefined;
  search: ISearchProps | undefined;
}

/**
 * Handles the settings-modal
 * @param {Array<IThemeProps>} themes - the list of themes a user can select between
 * @param {ISearchProps} search - the list of search providers
 */
const Settings = ({ themes, search }: ISettingsProps) => {
  const [newTheme, setNewTheme] = useState<IThemeProps>();

  if (themes && search) {
    return (
      <Modal element="icon" icon="settings" title="Settings">
        {themes && (
          <Section>
            <SectionHeadline>Theme:</SectionHeadline>
            <FormContainer>
              <Select
                options={themes}
                defaultValue={selectedTheme}
                onChange={(e: ValueType<IThemeProps, false>) => {
                  if (e !== null && e !== undefined) setNewTheme(e);
                }}
                styles={SelectorStyle}
              />
              <Button onClick={() => setTheme(JSON.stringify(newTheme))}>
                Apply
              </Button>
              <Button onClick={() => window.location.reload()}>Refresh</Button>
            </FormContainer>
          </Section>
        )}
        {search && (
          <Section>
            <SectionHeadline>Search Providers</SectionHeadline>
            <>
              <Text>Default Search Provider</Text>
              <Code>{search.defaultProvider}</Code>
            </>
            <>
              {
                search.providers && (
                  <Table>
                    <tbody>
                      <TableRow>
                        <HeadCell>Search Provider</HeadCell>
                        <HeadCell>Prefix</HeadCell>
                      </TableRow>
                      {search.providers.map((provider, index) => (
                        <TableRow key={provider.name + index}>
                          <TableCell>{provider.name}</TableCell>
                          <TableCell>{provider.prefix}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                )
              }
            </>
          </Section>
        )}
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default Settings;
