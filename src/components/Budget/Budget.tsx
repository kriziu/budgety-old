import { FC, useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import Button from '../Button/Button';
import BudgetModal from '../Modal/BudgetModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  BudgetType,
  deleteBudget,
  deleteTransaction,
  editBudget,
  transactionsChange,
} from '../../actions';
import BudgetInfo from './BudgetInfo';
import { StoreState } from '../../reducers';

const Budget: FC<BudgetType> = ({ id, title, amount, date }): JSX.Element => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const transactions = useSelector((state: StoreState) => state.transactions);

  const handleModalToggleButton = (): void => setModalOpened(!modalOpened);

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
        date: new Date(),
      })
    );

    dispatch(transactionsChange());
  };

  const handleDeleteButton = (): void => {
    dispatch(deleteBudget(id));

    transactions.forEach(transaction => {
      if (transaction.budgetId === id)
        dispatch(deleteTransaction(transaction.id));
    });
  };

  return (
    <div className="w-56 shadow-2xl rounded-2xl text-center p-5 bg-white">
      <BudgetInfo budget={{ id, title, amount, date }} />
      <Button
        title="Edit"
        className="mt-1"
        color="gray-900"
        onClick={handleModalToggleButton}
      />

      <CSSTransition
        in={modalOpened}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <BudgetModal
          onClose={handleModalToggleButton}
          title={title}
          amount={amount.starting}
          id={id}
          onDelete={handleDeleteButton}
          onSave={handleSaveButton}
        />
      </CSSTransition>
    </div>
  );
};

export default Budget;
