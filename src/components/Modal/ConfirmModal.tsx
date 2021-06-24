import { FC } from 'react';
import Button from '../Button/Button';
import ButtonSecondary from '../Button/ButtonSecondary';

import Modal from './Modal';

interface ConfirmModalProps {
  actionTitle: string;
  onClose: () => void;
  onAction: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  actionTitle,
  onClose,
  onAction,
}): JSX.Element => {
  return (
    <Modal onClose={onClose}>
      <div
        className="m-auto mt-1/2 bg-white w-3/4 md:w-1/2 lg:w-1/3 2xl:w-1/4 shadow-2xl rounded-xl p-5"
        onClick={e => e.stopPropagation()}
      >
        <h1 className="text-xl text-center">Are you sure?</h1>
        <div className="flex mt-5">
          <ButtonSecondary
            title="Cancel"
            color="gray-900"
            className="mt-2"
            onClick={onClose}
          />
          <div className="w-10"></div>
          <Button
            title={actionTitle}
            color="gray-900"
            className="mt-2"
            onClick={onAction}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
