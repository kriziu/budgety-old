import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { CashIcon, CogIcon, XIcon } from '@heroicons/react/solid';

import { addTransaction, transactionsChange } from '../../actions';
import Button from '../Button/Button';
import Modal from './Modal';
import { setMoneyColor } from '../../utils/ui';
import ButtonSecondary from '../Button/ButtonSecondary';
import Input from '../Input/Input';

interface BudgetModalProps {
  title: string;
  amount: number;
  id: number;
  onClose: () => void;
  onDelete: () => void;
  onSave: (title: string, amount: number) => void;
}

const BudgetModal: FC<BudgetModalProps> = ({
  title,
  amount,
  id,
  onClose,
  onDelete,
  onSave,
}): JSX.Element => {
  // STATE
  const [newBudgetTitle, setNewBudgetTitle] = useState(title);
  const [newBudgetAmount, setNewBudgetAmount] = useState(amount.toFixed(2));

  const [transactionTitle, settransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const [edit, setEdit] = useState(true);

  const dispatch = useDispatch();

  // HANDLE METHODS
  const handleBudgetTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewBudgetTitle(e.target.value);

  const handleBudgetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewBudgetAmount(e.target.value);

  const handleTransactionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => settransactionTitle(e.target.value);

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setTransactionAmount(e.target.value);

  const handleEditClick = (): void => setEdit(!edit);

  const handleButtonSaveBudgetClick = (): void => {
    if (newBudgetTitle && !isNaN(parseFloat(newBudgetAmount))) {
      onSave(newBudgetTitle, parseFloat(newBudgetAmount));
      onClose();
    }
  };

  const handleButtonAddTransactionClick = (): void => {
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
      onClose();
    }
  };

  // RENDER METHODS
  const renderInputOptions = (): JSX.Element => {
    const options = {
      title: edit ? newBudgetTitle : transactionTitle,
      handleTitleChange: edit
        ? handleBudgetTitleChange
        : handleTransactionTitleChange,
      amount: edit ? newBudgetAmount : transactionAmount,
      handleAmountChange: edit
        ? handleBudgetAmountChange
        : handleTransactionAmountChange,
      handleButtonPrimaryClick: edit
        ? handleButtonSaveBudgetClick
        : handleButtonAddTransactionClick,
      handleButtonSecondaryClick: edit ? onDelete : onClose,
    };

    return (
      <>
        <div className="items-center flex flex-col">
          <Input
            value={options.title}
            type="text"
            handleChange={options.handleTitleChange}
            labelTitle={edit ? 'Budget title' : 'Transaction title'}
            placeholder="Title"
            warningShown={edit && !options.title}
            handleEnterClick={options.handleButtonPrimaryClick}
            inputClassName="text-2xl text-center"
            className="w-2/3 mb-5"
          />

          <Input
            value={options.amount}
            type="number"
            handleChange={options.handleAmountChange}
            labelTitle="Amount"
            placeholder="Amount"
            warningShown={!options.amount}
            handleEnterClick={options.handleButtonPrimaryClick}
            inputClassName={`text-2xl text-center ${setMoneyColor(
              parseFloat(options.amount)
            )}`}
            className="w-2/3 mb-5"
          />
        </div>

        <div className="flex">
          <ButtonSecondary
            title={edit ? 'Delete' : 'Cancel'}
            color="gray-900"
            onClick={options.handleButtonSecondaryClick}
            className="mt-2"
          />
          <div className="w-10"></div>
          <Button
            title={edit ? 'Save' : 'Add'}
            color="gray-900"
            className="mt-2"
            onClick={options.handleButtonPrimaryClick}
          />
        </div>
      </>
    );
  };

  return (
    <Modal onClose={onClose}>
      <div
        className="m-auto mt-1/2 bg-white w-3/4 md:w-1/2 lg:w-1/3 2xl:w-1/4 shadow-2xl rounded-xl p-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <span onClick={handleEditClick}>
            {edit ? (
              <CashIcon className="w-7 h-7 cursor-pointer" />
            ) : (
              <CogIcon className="w-7 h-7 cursor-pointer" />
            )}
          </span>
          <XIcon className="w-7 h-7 cursor-pointer" onClick={onClose} />
        </div>
        {renderInputOptions()}
      </div>
    </Modal>
  );
};

export default BudgetModal;
