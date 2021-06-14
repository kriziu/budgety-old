import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TransactionType } from '../../actions';
import { StoreState } from '../../reducers';
import { diffDisplay, getItemById } from '../../utils/functions';

const Transaction: FC<TransactionType> = ({
  id,
  budgetId,
  title,
  amount,
  date,
}): JSX.Element => {
  const budgets = useSelector((state: StoreState) => state.budgets);
  const budget = getItemById(budgets, budgetId);

  const dateString = `${date.getDate()}.${
    (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  }.${date.getFullYear()}`;

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-lg font-medium">{title}</h1>
        <h2 className="text-md text-gray-500">{budget.title}</h2>
        <h3 className="text-sm text-gray-500">{dateString}</h3>
      </div>
      <div className="text-right">{diffDisplay(amount)}</div>
    </div>
  );
};

export default Transaction;
