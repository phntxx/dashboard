import Modal from "./modal";
import styled from "styled-components";
import { ListContainer, ItemList, Headline, SubHeadline } from "./elements";

const ModalSubHeadline = styled(SubHeadline)`
  display: block;
  padding: 0.5rem 0;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;

  color: ${(props) => props.theme.mainColor};
`;

const Link = styled.a`
  display: block;
  padding: 0;

  color: ${(props) => props.theme.mainColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ItemContainer = styled.div`
  padding: 1rem 0;
`;

export interface IImprintProps {
  name: IImprintFieldProps;
  address: IImprintFieldProps;
  phone: IImprintFieldProps;
  email: IImprintFieldProps;
  url: IImprintFieldProps;
  text: string;
}

export interface IImprintComponentProps {
  imprint: IImprintProps;
}

interface IImprintFieldComponentProps {
  field: IImprintFieldProps;
}

interface IImprintFieldProps {
  text: string;
  link: string;
}

/**
 * Renders an imprint field
 * @param {IImprintFieldComponentProps} props data for the field
 * @returns {React.ReactNode} the imprint field component
 */
export const ImprintField = ({ field }: IImprintFieldComponentProps) => (
  <Link href={field.link}>{field.text}</Link>
);

export const onClose = () => {
  if (window.location.href.endsWith("#imprint")) {
    window.location.href = window.location.href.replace("#imprint", "");
  }
};

/**
 * Renders the imprint component
 * @param {IImprintProps} props contents of the imprint
 * @returns {React.ReactNode} the imprint node
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
            onClose={onClose}
          >
            <div>
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
            </div>
            <div>
              <ModalSubHeadline>Imprint</ModalSubHeadline>
              {imprint.text && <Text>{imprint.text}</Text>}
            </div>
          </Modal>
        </ItemContainer>
      </ItemList>
    </ListContainer>
  </>
);

export default Imprint;
