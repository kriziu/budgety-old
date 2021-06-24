import { FC, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteTransaction,
  transactionsChange,
  TransactionType,
} from '../../actions';
import { StoreState } from '../../reducers';
import { getDateString, getItemById, getTimeString } from '../../utils/utility';
import { diffDisplay } from '../../utils/ui';
import { XIcon } from '@heroicons/react/solid';
import ConfirmModal from '../Modal/ConfirmModal';
import ButtonSecondary from '../Button/ButtonSecondary';

const Transaction: FC<TransactionType> = ({
  id,
  budgetId,
  title,
  amount,
  date,
}): JSX.Element => {
  const budgets = useSelector((state: StoreState) => state.budgets);
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const budget = getItemById(budgets, budgetId);
  const dateAndTime = `${getDateString(date)} | ${getTimeString(date)}`;

  const handleDeleteTransaction = (): void => {
    dispatch(deleteTransaction(id));
    dispatch(transactionsChange());
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-medium">{title}</h1>
          <h2 className="text-md text-gray-500">{budget.title}</h2>
          <h3 className="text-sm text-gray-500">{dateAndTime}</h3>
        </div>
        <div className="flex justify-between w-32 sm:w-44 items-center">
          {diffDisplay(amount)}
          <div onClick={() => setModalOpened(true)}>
            <ButtonSecondary
              title="Delete"
              color="red-500"
              className="hidden sm:block"
            />
            <ButtonSecondary
              className="block sm:hidden"
              color="red-500"
              icon={<XIcon className="w-6 h-6 m-auto" />}
            />
          </div>
        </div>
      </div>
      <CSSTransition
        in={modalOpened}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <ConfirmModal
          onClose={() => setModalOpened(false)}
          onAction={handleDeleteTransaction}
          actionTitle="Delete"
        />
      </CSSTransition>
    </>
  );
};

export default Transaction;
