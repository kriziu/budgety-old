import { FC, useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import Button from '../Button/Button';
import BudgetModal from '../Modal/BudgetModal';
import { useDispatch } from 'react-redux';
import {
  BudgetType,
  deleteBudget,
  editBudget,
  transactionsChange,
} from '../../actions';
import '../styles/animations.css';
import BudgetInfo from './BudgetInfo';

const Budget: FC<BudgetType> = ({ id, title, amount, date }): JSX.Element => {
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

  return (
    <div className="w-56 shadow-2xl rounded-2xl text-center p-5 bg-white bg-opacity-50">
      <BudgetInfo budget={{ id, title, amount, date }} />
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
