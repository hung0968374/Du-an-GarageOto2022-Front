import React from 'react';
import Modal from 'react-modal';

interface ModalComponentsProps {
  children: React.ReactNode;
  isOpen: boolean;
  styling: ReactModal.Styles;
  requestCloseModal?: () => void;
}

export const ModalComponents: React.FunctionComponent<ModalComponentsProps> = ({
  children,
  isOpen,
  styling,
  requestCloseModal,
}) => {
  return (
    <Modal isOpen={isOpen} style={styling} onRequestClose={requestCloseModal}>
      {children}
    </Modal>
  );
};
