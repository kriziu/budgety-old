import { FC, useState } from 'react';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusSmIcon,
} from '@heroicons/react/solid';
import { CSSTransition } from 'react-transition-group';

import Button from '../Button/Button';
import BudgetModal from '../Modal/BudgetModal';
import { useDispatch } from 'react-redux';
import {
  BudgetProps,
  deleteBudget,
  editBudget,
  transactionsChange,
} from '../../actions';
import { setMoneyColor } from '../../utils/functions';
import '../styles/animations.css';

const Budget: FC<BudgetProps> = ({ id, title, amount, date }): JSX.Element => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const handleModalOpenButton = (): void => setModalOpened(!modalOpened);

  const handleSaveButton = (newTitle: string, newAmount: number): void => {
    dispatch(
      editBudget({
        id,
        title: newTitle,
        amount: {
          actual: newAmount,
          starting: newAmount,
          diff: amount.diff,
        },
        date,
      })
    );

    dispatch(transactionsChange());
  };

  const diffDisplay = {
    minus: (
      <div className="text-red-500 text-lg">
        {amount.diff.toFixed(2)}$
        <ChevronDownIcon className="w-5 h-5 m-auto" />
      </div>
    ),
    plus: (
      <div className="text-green-500 text-lg">
        {amount.diff.toFixed(2)}$
        <ChevronUpIcon className="w-5 h-5 m-auto" />
      </div>
    ),
    zero: (
      <div className="text-lg">
        0.00$
        <MinusSmIcon className="w-5 h-5 m-auto" />
      </div>
    ),
  };

  const renderDiff = (): JSX.Element => {
    if (amount.diff > 0) return diffDisplay.plus;
    else if (amount.diff < 0) return diffDisplay.minus;
    return diffDisplay.zero;
  };

  return (
    <div className="w-56 shadow-2xl rounded-2xl text-center p-5 bg-white bg-opacity-50">
      <h1 className="text-xl tracking-wide">{title}</h1>
      <h1 className={`text-3xl ${setMoneyColor(amount.actual)} mt-1`}>
        {amount.actual.toFixed(2)}$
      </h1>
      <div className="flex w-2/3 m-auto justify-around mt-1">
        {renderDiff()}
      </div>
      <Button
        title="Edit"
        className="mt-2 bg-gray-900 text-white hover:bg-black border-4 border-gray-900 active:bg-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-300"
        onClick={handleModalOpenButton}
      />

      <CSSTransition
        in={modalOpened}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <BudgetModal
          close={handleModalOpenButton}
          title={title}
          amount={amount.starting}
          id={id}
          onDelete={() => dispatch(deleteBudget(id))}
          onSave={handleSaveButton}
        />
      </CSSTransition>
    </div>
  );
};

export default Budget;
