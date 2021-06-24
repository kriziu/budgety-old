import { FC } from 'react';

import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { StoreState } from '../../reducers';
import Budget from './Budget';

const BudgetList: FC = (): JSX.Element => {
  const budgets = useSelector((state: StoreState) => state.budgets);

  const renderBudgets = () => {
    if (budgets)
      return budgets.map(budget => {
        return (
          <CSSTransition key={budget.id} timeout={200} classNames="slide">
            <Budget {...budget} />
          </CSSTransition>
        );
      });
  };

  return (
    <TransitionGroup
      className="grid gap-10 justify-center my-10"
      style={{ gridTemplateColumns: 'repeat(auto-fit, 14rem)' }}
    >
      {renderBudgets()}
    </TransitionGroup>
  );
};

export default BudgetList;
