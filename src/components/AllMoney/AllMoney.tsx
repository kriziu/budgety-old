import { FC } from 'react';

import { useSelector } from 'react-redux';
import { StoreState } from '../../reducers';
import { setMoneyColor } from '../../utils/ui';

const AllMoney: FC = (): JSX.Element => {
  const budgets = useSelector((state: StoreState) => state.budgets);

  let money = 0;
  budgets.forEach(budget => {
    money += budget.amount.actual;
  });

  return (
    <div className="text-center">
      <h1 className={`${setMoneyColor(money)} text-3xl `}>
        {money.toFixed(2)}$
      </h1>
    </div>
  );
};

export default AllMoney;
