import { FC } from 'react';

import { useSelector } from 'react-redux';

import { StoreState } from '../../reducers';
import Transaction from './Transaction';

const TransactionList: FC = (): JSX.Element => {
  const transactions = useSelector((state: StoreState) => state.transactions);

  const renderTransactions = (): JSX.Element[] => {
    return transactions.map((transaction, i) => {
      return (
        <li key={transaction.id}>
          <Transaction {...transaction} />
          {i !== transactions.length - 1 && (
            <div className="h-px bg-gray-500 opacity-20 my-3"></div>
          )}
        </li>
      );
    });
  };

  return <ul className="mt-20 w-1/2">{renderTransactions()}</ul>;
};

export default TransactionList;
