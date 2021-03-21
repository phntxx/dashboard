import React from "react";
import Modal from "./modal";
import styled from "styled-components";
import selectedTheme from "../lib/theme";
import {
  ListContainer,
  ItemList,
  Headline,
  SubHeadline,
} from "./elements";

const ModalSubHeadline = styled(SubHeadline)`
  display: block;
  padding: 0.5rem 0;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;

  color: ${selectedTheme.mainColor};
`;

const Link = styled.a`
  display: block;
  padding: 0;

  color: ${selectedTheme.mainColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ItemContainer = styled.div`
  padding: 1rem 0;
`;

interface IImprintFieldProps {
  text: string;
  link: string;
}

export interface IImprintProps {
  name: IImprintFieldProps;
  address: IImprintFieldProps;
  phone: IImprintFieldProps;
  email: IImprintFieldProps;
  url: IImprintFieldProps;
  text: string;
}

interface IImprintFieldComponentProps {
  field: IImprintFieldProps;
}

interface IImprintComponentProps {
  imprint: IImprintProps;
}

/**
 * Renders an imprint field
 * @param {IImprintFieldComponentProps} props - The data for the field
 */
const ImprintField = ({ field }: IImprintFieldComponentProps) => (
  <Link href={field.link}>{field.text}</Link>
);

/**
 * Renders the imprint component
 * @param {IImprintProps} props - The contents of the imprint
 */
const Imprint = ({ imprint }: IImprintComponentProps) => (
  <>
    <ListContainer>
      <Headline>About</Headline>
      <ItemList>
        <ItemContainer>
          <SubHeadline>Imprint</SubHeadline>
          <Modal
            element="text"
            text="View Imprint"
            title="Legal Disclosure"
            condition={!window.location.href.endsWith("#imprint")}
            onClose={() => {
              if (window.location.href.endsWith("#imprint")) {
                let location = window.location.href.replace("#imprint", "");
                window.location.href = location;
              }
            }}
          >
            <ModalSubHeadline>
              Information in accordance with section 5 TMG
            </ModalSubHeadline>
            <>
              {imprint.name && <ImprintField field={imprint.name} />}
              {imprint.address && <ImprintField field={imprint.address} />}
              {imprint.email && <ImprintField field={imprint.email} />}
              {imprint.phone && <ImprintField field={imprint.phone} />}
              {imprint.url && <ImprintField field={imprint.url} />}
            </>
            <Text>
              {imprint.text}
            </Text>
          </Modal>
        </ItemContainer>
      </ItemList>
    </ListContainer>
  </>
);

export default Imprint;
