import { FC } from 'react';
import ReactDOM from 'react-dom';

const modalHTML = document.querySelector('#modal') as HTMLElement;

interface ModalProps {
  children: JSX.Element;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }): JSX.Element => {
  return ReactDOM.createPortal(
    <div
      className="fixed flex w-screen h-screen bg-black bg-opacity-60 z-10"
      onClick={onClose}
    >
      {children}
    </div>,
    modalHTML
  );
};

export default Modal;
