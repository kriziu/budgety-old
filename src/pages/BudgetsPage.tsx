import { FC } from 'react';
import BudgetList from '../components/Budget/BudgetList';
import InputBudget from '../components/InputBudget/InputBudget';

const BudgetsPage: FC = (): JSX.Element => {
  return (
    <div>
      <InputBudget />
      <BudgetList />
    </div>
  );
};

export default BudgetsPage;
