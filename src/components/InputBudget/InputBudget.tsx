import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import { addBudget } from '../../actions';
import { setMoneyColor } from '../../utils/ui';
import AllMoney from '../AllMoney/AllMoney';
import Button from '../Button/Button';
import Input from '../Input/Input';

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

  const handleButtonAddClick = (): void => {
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
      <Input
        value={budgetTitle}
        handleChange={handleBudgetTitleChange}
        type="text"
        warningShown={budgetTitleChecker}
        placeholder="Enter budget title"
        labelTitle="Budget"
        handleEnterClick={handleButtonAddClick}
        className="my-5"
      />
      <Input
        value={budgetAmount}
        type="number"
        handleChange={handleBudgetAmountChange}
        warningShown={budgetAmountChecker}
        placeholder="Enter amount"
        labelTitle="Amount"
        handleEnterClick={handleButtonAddClick}
        className="my-5"
        inputClassName={setMoneyColor(parseFloat(budgetAmount))}
      />
      <Button title="Add" color="green-500" onClick={handleButtonAddClick} />
    </div>
  );
};

export default InputBudget;
