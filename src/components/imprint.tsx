import React from "react";
import Modal from "./modal";
import styled from "styled-components";
import selectedTheme from "../lib/theme";
import {
  ListContainer,
  ItemList,
  Headline as Hl,
  SubHeadline as SHl,
} from "./elements";

const Headline = styled(Hl)`
  display: block;
  padding: 1rem 0;
`;

const ModalSubHeadline = styled(SHl)`
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
}

interface IImprintFieldComponentProps {
  field: IImprintFieldProps;
}

const ImprintField = ({ field }: IImprintFieldComponentProps) => (
  <Link href={field.link}>{field.text}</Link>
);

interface IImprintComponentProps {
  imprint: IImprintProps;
}

const Imprint = ({ imprint }: IImprintComponentProps) => (
  <>
    <ListContainer>
      <Hl>About</Hl>
      <ItemList>
        <ItemContainer>
          <SHl>Imprint</SHl>
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
            <Headline>Disclaimer</Headline>
            <ModalSubHeadline>Accountability for content</ModalSubHeadline>
            <Text>
              The contents of our pages have been created with the utmost care.
              However, we cannot guarantee the contents' accuracy, completeness
              or topicality. According to statutory provisions, we are
              furthermore responsible for our own content on these web pages. In
              this matter, please note that we are not obliged to monitor the
              transmitted or saved information of third parties, or investigate
              circumstances pointing to illegal activity. Our obligations to
              remove or block the use of information under generally applicable
              laws remain unaffected by this as per §§ 8 to 10 of the Telemedia
              Act (TMG).
            </Text>
            <ModalSubHeadline>Accountability for links</ModalSubHeadline>
            <Text>
              Responsibility for the content of external links (to web pages of
              third parties) lies solely with the operators of the linked pages.
              No violations were evident to us at the time of linking. Should
              any legal infringement become known to us, we will remove the
              respective link immediately.
            </Text>
            <ModalSubHeadline>Copyright</ModalSubHeadline>
            <Text>
              Our web pages and their contents are subject to German copyright
              law. Unless expressly permitted by law, every form of utilizing,
              reproducing or processing works subject to copyright protection on
              our web pages requires the prior consent of the respective owner
              of the rights. Individual reproductions of a work are only allowed
              for private use. The materials from these pages are copyrighted
              and any unauthorized use may violate copyright laws.
            </Text>
          </Modal>
        </ItemContainer>
      </ItemList>
    </ListContainer>
  </>
);

export default Imprint;
