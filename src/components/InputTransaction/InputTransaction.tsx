import React, { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  addTransaction,
  TransactionType,
  transactionsChange,
} from '../../actions';
import { StoreState } from '../../reducers';
import {
  getUniqueId,
  handleEnterPressed,
  setMoneyColor,
} from '../../utils/functions';
import AllMoney from '../AllMoney/AllMoney';
import BudgetInfo from '../Budget/BudgetInfo';
import Button from '../Button/Button';

const InputTransaction: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const budgets = useSelector((state: StoreState) => state.budgets);
  const transactions = useSelector((state: StoreState) => state.transactions);

  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionAmountChecker, setTransactionAmountChecker] =
    useState(false);
  const [selectedBudgetOption, setSelectedBudgetOption] = useState(-1);
  const [selectedBudget, setSelectedBudget] = useState(budgets[0]);

  useEffect(() => {
    selectedBudget && setSelectedBudgetOption(selectedBudget.id);
  }, [selectedBudget]);

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

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const optionId = parseInt(e.target.value);
    budgets.forEach(
      budget => budget.id === optionId && setSelectedBudget(budget)
    );
  };

  const handleButtonClick = (): void => {
    !transactionAmount && setTransactionAmountChecker(true);

    const transactionAmountNum = +parseFloat(transactionAmount).toFixed(2);
    if (!isNaN(transactionAmountNum)) {
      const uniqueId = getUniqueId<TransactionType>(transactions);
      const transaction: TransactionType = {
        id: uniqueId,
        budgetId: selectedBudgetOption,
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

  const renderOptions = (): JSX.Element[] => {
    return budgets.map(budget => {
      return (
        <option value={budget.id} key={budget.id}>
          {budget.title}: {budget.amount.actual}$
        </option>
      );
    });
  };

  return (
    <div className="w-full sm:w-3/5 2xl:w-2/5 m-auto">
      <AllMoney />
      <div className="my-5">
        <label htmlFor="transactionTitle" className="text-xl">
          Transaction
        </label>
        <input
          className="input"
          type="text"
          placeholder="Enter a transaction title"
          id="transactionTitle"
          value={transactionTitle}
          onChange={handleTransactionTitleChange}
          onKeyPress={e => handleEnterPressed(e, handleButtonClick)}
        />
      </div>
      <div className="my-5">
        <label htmlFor="transactionAmount" className="text-xl">
          Amount
        </label>
        <input
          className={`${setMoneyColor(parseFloat(transactionAmount))} input`}
          type="number"
          placeholder="Enter amount"
          id="transactionAmount"
          value={transactionAmount}
          onChange={handleTransactionAmountChange}
          onKeyPress={e => handleEnterPressed(e, handleButtonClick)}
        />

        {transactionAmountChecker && (
          <p className="text-red-500 text-xs">Please fill out this field.</p>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="selectBudget" className="text-xl">
          Select budget
        </label>
        <select
          id="selectBudget"
          value={selectedBudgetOption}
          onChange={handleSelectChange}
          className="input"
        >
          {renderOptions()}
        </select>
      </div>
      <div className="my-5">
        {selectedBudget && <BudgetInfo budget={selectedBudget} />}
      </div>
      {selectedBudget ? (
        <Button
          title="Add"
          className="bg-green-500 text-white hover:bg-green-600 hover:border-green-600 border-4 border-green-500 focus:outline-none focus:shadow-outline focus:border-gray-300 active:bg-green-400"
          onClick={handleButtonClick}
        />
      ) : (
        <Button
          title="Add a budget on budgets page"
          className="bg-green-500 text-white border-4 border-green-500 cursor-not-allowed opacity-50"
          disabled
        />
      )}
    </div>
  );
};

export default InputTransaction;
