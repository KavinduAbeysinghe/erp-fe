import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Modal from "react-bootstrap/Modal";

interface CustomModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  body: ReactJSXElement;
}

export const CustomModal = ({
  show,
  handleClose,
  title,
  body,
}: CustomModalProps) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      className={"custom-modal"}
      data-bs-theme={"dark"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};
