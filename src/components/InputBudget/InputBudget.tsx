import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import { addBudget } from '../../actions';
import { setMoneyColor } from '../../utils/ui';
import { handleEnterPressed } from '../../utils/handlers';
import AllMoney from '../AllMoney/AllMoney';
import Button from '../Button/Button';

const InputBudget: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [budgetTitle, setBudgetTitle] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetTitleChecker, setBudgetTitleChecker] = useState(false);
  const [budgetAmountChecker, setBudgetAmountChecker] = useState(false);

  const handleBudgetTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBudgetTitle(e.target.value);
    e.target.value ? setBudgetTitleChecker(false) : setBudgetTitleChecker(true);
  };

  const handleBudgetAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBudgetAmount(e.target.value);
    e.target.value
      ? setBudgetAmountChecker(false)
      : setBudgetAmountChecker(true);
  };

  const handleButtonClick = (): void => {
    !budgetTitle && setBudgetTitleChecker(true);
    !budgetAmount && setBudgetAmountChecker(true);

    const budgetAmountNum = +parseFloat(budgetAmount).toFixed(2);
    if (budgetTitle && !isNaN(budgetAmountNum)) {
      dispatch(
        addBudget({
          id: -1,
          title: budgetTitle,
          amount: {
            actual: budgetAmountNum,
            starting: budgetAmountNum,
            diff: 0,
          },
          date: new Date(),
        })
      );
      setBudgetAmount('');
      setBudgetTitle('');
    }
  };

  return (
    <div className="w-full sm:w-3/5 2xl:w-2/5 m-auto">
      <AllMoney />
      <div className="my-5">
        <label htmlFor="budgetTitle" className="text-xl">
          Budget
        </label>
        <input
          className="input"
          type="text"
          placeholder="Enter a budget"
          id="budgetTitle"
          value={budgetTitle}
          onChange={handleBudgetTitleChange}
          onKeyPress={e => handleEnterPressed(e, handleButtonClick)}
        />
        {budgetTitleChecker && (
          <p className="text-red-500 text-xs">Please fill out this field.</p>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="budgetAmount" className="text-xl">
          Amount
        </label>
        <input
          className={`${setMoneyColor(parseFloat(budgetAmount))} input`}
          type="number"
          placeholder="Enter amount"
          id="budgetAmount"
          value={budgetAmount}
          onChange={handleBudgetAmountChange}
          onKeyPress={e => handleEnterPressed(e, handleButtonClick)}
        />
        {budgetAmountChecker && (
          <p className="text-red-500 text-xs">Please fill out this field.</p>
        )}
      </div>
      <Button
        title="Add"
        className="bg-green-500 text-white hover:bg-green-600 hover:border-green-600 border-4 border-green-500 focus:outline-none focus:shadow-outline focus:border-gray-300 active:bg-green-400"
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default InputBudget;
