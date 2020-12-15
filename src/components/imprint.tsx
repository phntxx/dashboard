import React, { useCallback, useEffect, useState } from "react";
import Modal from "./modal";
import styled from "styled-components";
import selectedTheme from "./themeManager";
import {
  handleResponse,
  ErrorMessage,
  ListContainer,
  ItemList,
  Headline as Hl,
  SubHeadline as SHl,
} from "./elements";

const Headline = styled(Hl)`
  display: block;
  padding: 1rem 0;
`;

const SubHeadline = styled(SHl)`
  display: block;
`;

const ModalSubHeadline = styled(SubHeadline)`
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

const useImprintData = () => {
  const [imprintData, setImprintData] = useState({
    name: { text: "", link: "" },
    address: { text: "", link: "" },
    phone: { text: "", link: "" },
    email: { text: "", link: "" },
    url: { text: "", link: "" },
    error: false,
  });
  const fetchImprintData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/imprint.json").then(handleResponse)
      : import("./data/imprint.json")
    )
      .then((jsonResponse: any) => {
        setImprintData({ ...jsonResponse, error: false });
      })
      .catch((error: any) => {
        setImprintData({
          name: { text: "", link: "" },
          address: { text: "", link: "" },
          phone: { text: "", link: "" },
          email: { text: "", link: "" },
          url: { text: "", link: "" },
          error: error.message,
        });
      });
  }, []);

  useEffect(() => {
    fetchImprintData();
  }, [fetchImprintData]);
  return { imprintData, fetchImprintData };
};

const onClose = () => {
  if (window.location.href.endsWith("#imprint")) {
    let location = window.location.href.replace("#imprint", "");
    window.location.href = location;
  }
};

const Imprint = () => {
  const {
    imprintData: { name, address, phone, email, url, error },
  } = useImprintData();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {!error ? (
        <ListContainer>
          <Hl>About</Hl>
          <ItemList>
            <ItemContainer>
              <SHl>Imprint</SHl>
              <Modal
                element="text"
                text="View Imprint"
                condition={!window.location.href.endsWith("#imprint")}
                onClose={() => onClose()}
              >
                <Headline>Legal Disclosure</Headline>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ModalSubHeadline>
                  Information in accordance with section 5 TMG
                </ModalSubHeadline>
                {!error && (
                  <>
                    <Link href={name.link}>{name.text}</Link>
                    <Link href={address.link}>{address.text}</Link>
                    <Link href={phone.link}>{phone.text}</Link>
                    <Link href={email.link}>{email.text}</Link>
                    <Link href={url.link}>{url.text}</Link>
                  </>
                )}
                <Headline>Disclaimer</Headline>
                <ModalSubHeadline>Accountability for content</ModalSubHeadline>
                <Text>
                  The contents of our pages have been created with the utmost
                  care. However, we cannot guarantee the contents' accuracy,
                  completeness or topicality. According to statutory provisions,
                  we are furthermore responsible for our own content on these
                  web pages. In this matter, please note that we are not obliged
                  to monitor the transmitted or saved information of third
                  parties, or investigate circumstances pointing to illegal
                  activity. Our obligations to remove or block the use of
                  information under generally applicable laws remain unaffected
                  by this as per §§ 8 to 10 of the Telemedia Act (TMG).
                </Text>
                <ModalSubHeadline>Accountability for links</ModalSubHeadline>
                <Text>
                  Responsibility for the content of external links (to web pages
                  of third parties) lies solely with the operators of the linked
                  pages. No violations were evident to us at the time of
                  linking. Should any legal infringement become known to us, we
                  will remove the respective link immediately.
                </Text>
                <ModalSubHeadline>Copyright</ModalSubHeadline>
                <Text>
                  Our web pages and their contents are subject to German
                  copyright law. Unless expressly permitted by law, every form
                  of utilizing, reproducing or processing works subject to
                  copyright protection on our web pages requires the prior
                  consent of the respective owner of the rights. Individual
                  reproductions of a work are only allowed for private use. The
                  materials from these pages are copyrighted and any
                  unauthorized use may violate copyright laws.
                </Text>
              </Modal>
            </ItemContainer>
          </ItemList>
        </ListContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Imprint;
