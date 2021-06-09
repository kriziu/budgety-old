import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { CashIcon, CogIcon, XIcon } from '@heroicons/react/solid';

import { addTransaction, transactionsChange } from '../../actions';
import Button from '../Button/Button';
import Modal from './Modal';
import { setMoneyColor } from '../../utils/functions';

interface BudgetModalProps {
  close: () => void;
  title: string;
  amount: number;
  id: number;
  onDelete: () => void;
  onSave: (title: string, amount: number) => void;
}

const BudgetModal: FC<BudgetModalProps> = ({
  close,
  title,
  amount,
  id,
  onDelete,
  onSave,
}): JSX.Element => {
  // STATE
  const [newTitle, setNewTitle] = useState(title);
  const [newAmount, setNewAmount] = useState(amount.toFixed(2));

  const [transactionTitle, settransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const [edit, setEdit] = useState(true);

  const dispatch = useDispatch();

  // HANDLE METHODS
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.target.value);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewAmount(e.target.value);

  const handletransactionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => settransactionTitle(e.target.value);

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setTransactionAmount(e.target.value);

  const handleEditClick = (): void => setEdit(!edit);

  const handleButtonSaveClick = (): void => {
    if (newTitle && !isNaN(parseFloat(newAmount))) {
      onSave(newTitle, parseFloat(newAmount));
      close();
    }
  };

  const handleButtonAddClick = (): void => {
    if (!isNaN(parseFloat(transactionAmount))) {
      dispatch(
        addTransaction({
          id: -1,
          budgetId: id,
          title: transactionTitle,
          amount: parseFloat(transactionAmount),
          date: new Date(),
        })
      );

      dispatch(transactionsChange());
      close();
    }
  };

  // RENDER METHODS
  const renderBudgetEdit = (): JSX.Element => {
    return (
      <>
        <div className="items-center flex flex-col">
          <div className="w-2/3 mb-5">
            <label htmlFor="title" className="text-xl">
              Budget name
            </label>
            <input
              className="input text-2xl text-center"
              id="title"
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Title"
            />
            {!newTitle && (
              <p className="text-red-500 text-xs">
                Please fill out this field.
              </p>
            )}
          </div>

          <div className="w-2/3 mb-5">
            <label htmlFor="title" className="text-xl">
              Amount
            </label>
            <input
              className={`${setMoneyColor(
                parseFloat(newAmount)
              )} input text-2xl text-center`}
              id="title"
              type="number"
              value={newAmount}
              onChange={handleAmountChange}
              placeholder="amount"
            />
            {!newAmount && (
              <p className="text-red-500 text-xs">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>

        <div className="flex">
          <Button
            title="Delete"
            className="mt-2 text-gray-900 hover:bg-gray-900 hover:text-white border-2 border-gray-900 active:bg-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-300"
            onClick={onDelete}
          />
          <div className="w-10"></div>
          <Button
            title="Save"
            className="mt-2 bg-gray-900 text-white hover:bg-black border-4 border-gray-900 hover:border-black active:bg-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-300"
            onClick={handleButtonSaveClick}
          />
        </div>
      </>
    );
  };

  const renderTransaction = (): JSX.Element => {
    return (
      <>
        <div className="items-center flex flex-col">
          <div className="w-2/3 mb-5">
            <label htmlFor="title" className="text-xl">
              Transaction name
            </label>
            <input
              className="input text-2xl text-center"
              id="title"
              type="text"
              value={transactionTitle}
              onChange={handletransactionTitleChange}
              placeholder="Title"
            />
          </div>

          <div className="w-2/3 mb-5">
            <label htmlFor="title" className="text-xl">
              Amount
            </label>
            <input
              className={`${setMoneyColor(
                parseFloat(transactionAmount)
              )} input text-2xl text-center`}
              id="title"
              type="number"
              value={transactionAmount}
              onChange={handleTransactionAmountChange}
              placeholder="amount"
            />
            {!transactionAmount && (
              <p className="text-red-500 text-xs">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>

        <div className="flex">
          <Button
            title="Cancel"
            className="mt-2 text-gray-900 hover:bg-gray-900 hover:text-white border-2 border-gray-900 active:bg-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-300"
            onClick={onDelete}
          />
          <div className="w-10"></div>
          <Button
            title="Add"
            className="mt-2 bg-gray-900 text-white hover:bg-black border-4 border-gray-900 hover:border-black active:bg-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-300"
            onClick={handleButtonAddClick}
          />
        </div>
      </>
    );
  };

  return (
    <Modal close={close}>
      <div
        className="m-auto mt-1/2 bg-white w-3/4 md:w-1/2 lg:w-1/3 2xl:w-1/4 shadow-2xl rounded-xl p-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between">
          {edit ? (
            <CashIcon
              className="w-7 h-7 cursor-pointer"
              onClick={handleEditClick}
            />
          ) : (
            <CogIcon
              className="w-7 h-7 cursor-pointer"
              onClick={handleEditClick}
            />
          )}
          <XIcon className="w-7 h-7 cursor-pointer" onClick={close} />
        </div>
        {edit ? renderBudgetEdit() : renderTransaction()}
      </div>
    </Modal>
  );
};

export default BudgetModal;
