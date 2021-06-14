import { FC } from 'react';
import InputTransaction from '../components/InputTransaction/InputTransaction';
import TransactionList from '../components/Transaction/TransactionList';

const PaymentsPage: FC = (): JSX.Element => {
  return (
    <div>
      <InputTransaction />
      <TransactionList />
    </div>
  );
};

export default PaymentsPage;
