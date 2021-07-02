import { useState } from "react";
import styled from "styled-components";

import Select from "./select";

import { ISearchProps } from "./searchBar";
import selectedTheme, { setTheme, IThemeProps } from "../lib/theme";
import { Button, SubHeadline } from "./elements";

import Modal from "./modal";

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const Table = styled.table`
  font-weight: 400;
  background: none;
  width: 100%;
  color: ${selectedTheme.mainColor};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${selectedTheme.mainColor};
`;

export const TableCell = styled.td`
  background: none;
  padding-top: 0.5rem;
`;

export const HeadCell = styled.th`
  font-weight: 700;
  text-align: left;
`;

export const Section = styled.div`
  padding: 1rem 0;
`;

export const SectionHeadline = styled(SubHeadline)`
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

const ThemeSelect = styled(Select)`
  -webkit-appearance: button;
  -moz-appearance: button;

  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  border: 1px solid ${selectedTheme.mainColor};
  color: ${selectedTheme.mainColor};
  background: none;

  & > option {
    background-color: ${selectedTheme.backgroundColor};
  }
`;

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

  if (themes || search) {
    return (
      <Modal element="icon" icon="settings" title="Settings">
        {themes && (
          <Section>
            <SectionHeadline>Theme:</SectionHeadline>
            <FormContainer>
              <ThemeSelect
                items={themes}
                onChange={(theme: IThemeProps) => setNewTheme(theme)}
              ></ThemeSelect>
              <Button
                data-testid="button-submit"
                onClick={() => {
                  if (newTheme) setTheme(newTheme);
                }}
              >
                Apply
              </Button>
              <Button
                data-testid="button-refresh"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
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
              {search.providers && (
                <Table>
                  <tbody>
                    <TableRow>
                      <HeadCell>Search Provider</HeadCell>
                      <HeadCell>Prefix</HeadCell>
                    </TableRow>
                    {search.providers.map(({ name, prefix }, index) => (
                      <TableRow key={name + index}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{prefix}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              )}
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
