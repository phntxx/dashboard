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
  fields: Array<IImprintFieldProps>;
  text: string;
}

export interface IImprintComponentProps {
  imprint?: IImprintProps;
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
const Imprint = ({ imprint }: IImprintComponentProps) => {
  if (imprint)
    return (
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
                {imprint.fields && (
                  <div>
                    <ModalSubHeadline>
                      Information in accordance with section 5 TMG
                    </ModalSubHeadline>
                    <>
                      {imprint.fields.map((field, index) => (
                        <ImprintField
                          key={[field.text, index].join("")}
                          field={field}
                        />
                      ))}
                    </>
                  </div>
                )}
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

  return <></>;
};

export default Imprint;
