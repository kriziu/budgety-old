import React, { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  addTransaction,
  TransactionType,
  transactionsChange,
} from '../../actions';
import { StoreState } from '../../reducers';
import { getUniqueId } from '../../utils/utility';
import { setMoneyColor } from '../../utils/ui';
import AllMoney from '../AllMoney/AllMoney';
import BudgetInfo from '../Budget/BudgetInfo';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';

const InputTransaction: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const budgets = useSelector((state: StoreState) => state.budgets);
  const transactions = useSelector((state: StoreState) => state.transactions);

  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionAmountChecker, setTransactionAmountChecker] =
    useState(false);
  const [selectedBudget, setSelectedBudget] = useState(budgets[0]);

  const handleTransactionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTransactionTitle(e.target.value);
  };

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTransactionAmount(e.target.value);
    e.target.value
      ? setTransactionAmountChecker(false)
      : setTransactionAmountChecker(true);
  };

  const handleButtonAddClick = (): void => {
    !transactionAmount && setTransactionAmountChecker(true);

    const transactionAmountNum = +parseFloat(transactionAmount).toFixed(2);
    if (!isNaN(transactionAmountNum)) {
      const uniqueId = getUniqueId<TransactionType>(transactions);
      const transaction: TransactionType = {
        id: uniqueId,
        budgetId: selectedBudget.id,
        title: transactionTitle,
        amount: transactionAmountNum,
        date: new Date(),
      };

      dispatch(addTransaction(transaction));
      dispatch(transactionsChange());
      setTransactionAmount('');
      setTransactionTitle('');
    }
  };

  return (
    <div className="w-full sm:w-3/5 2xl:w-2/5 m-auto">
      <AllMoney />
      <Input
        value={transactionTitle}
        type="text"
        handleChange={handleTransactionTitleChange}
        labelTitle="Transaction title"
        placeholder="Enter transaction title"
        handleEnterClick={handleButtonAddClick}
        className="my-5"
      />

      <Input
        value={transactionAmount}
        type="number"
        handleChange={handleTransactionAmountChange}
        labelTitle="Amount"
        placeholder="Enter amount"
        warningShown={transactionAmountChecker}
        handleEnterClick={handleButtonAddClick}
        className="my-5"
        inputClassName={setMoneyColor(parseFloat(transactionAmount))}
      />

      <div className="my-5">
        <label className="text-xl mb-2 block" htmlFor="selectBudgets">
          Select budget
        </label>

        <Dropdown
          htmlId="selectBudgets"
          options={budgets}
          optionSelected={selectedBudget}
          setOptionSelected={setSelectedBudget}
        />
      </div>

      <div className="my-5">
        {selectedBudget && <BudgetInfo budget={selectedBudget} />}
      </div>

      {selectedBudget ? (
        <Button title="Add" color="green-500" onClick={handleButtonAddClick} />
      ) : (
        <Button
          title="Add a budget on budgets page"
          color="green-300"
          disabled
        />
      )}
    </div>
  );
};

export default InputTransaction;
