import React, { useState } from "react";
import styled from "styled-components";
import selectedTheme from "../lib/theme";

import { Headline, IconButton } from "./elements";

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 1rem;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 1px solid ${selectedTheme.mainColor};
  background-color: ${selectedTheme.backgroundColor};
`;

const Text = styled.p`
  padding: 0;
  margin: 0;

  font-weight: 400;
  text-decoration: none;
  color: ${selectedTheme.accentColor};
  padding-top: 0.75rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

interface IModalProps {
  element: string;
  icon?: string;
  text?: string;
  condition?: boolean;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

/**
 * Renders a modal with button to hide and un-hide
 * @param {IModalProps} props - The needed props for the modal
 */
const Modal = ({ element, icon, text, condition, title, onClose, children }: IModalProps) => {
  const [modalHidden, setModalHidden] = useState(condition ?? true);

  const closeModal = () => {
    if (onClose) onClose();
    setModalHidden(!modalHidden);
  };

  return (
    <>
      {element === "icon" && (
        <IconButton icon={icon ?? ""} onClick={() => closeModal()} />
      )}

      {element === "text" && (
        <Text onClick={() => closeModal()}>{text}</Text>
      )}

      <ModalContainer hidden={modalHidden}>
        <TitleContainer>
          <Headline>{title}</Headline>
          <IconButton icon="close" onClick={() => closeModal()} />
        </TitleContainer>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;
