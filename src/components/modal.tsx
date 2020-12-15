import React, { useState } from "react";
import styled from "styled-components";
import selectedTheme from "./themeManager";

import { IconButton } from "./elements";

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

interface IModalInterface {
  element: string;
  icon?: string;
  text?: string;
  condition?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = (props: IModalInterface) => {
  const [modalHidden, setModalHidden] = useState(props.condition ?? true);

  const closeModal = () => {
    if (props.onClose) props.onClose();
    setModalHidden(!modalHidden);
  };

  return (
    <>
      {props.element === "icon" && (
        <IconButton icon={props.icon ?? ""} onClick={() => closeModal()} />
      )}

      {props.element === "text" && (
        <Text onClick={() => closeModal()}>{props.text}</Text>
      )}

      <ModalContainer hidden={modalHidden}>
        <IconButton icon="close" onClick={() => closeModal()} />
        {props.children}
      </ModalContainer>
    </>
  );
};

export default Modal;
