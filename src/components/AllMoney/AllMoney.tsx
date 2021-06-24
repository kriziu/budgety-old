import { useEffect, useState, FC } from 'react';

import { useSelector } from 'react-redux';

import { StoreState } from '../../reducers';
import { setMoneyColor } from '../../utils/ui';

const AllMoney: FC = (): JSX.Element => {
  const [money, setMoney] = useState(0);
  const budgets = useSelector((state: StoreState) => state.budgets);

  useEffect(() => {
    let i = 0;

    budgets.forEach(budget => (i += budget.amount.actual));

    setMoney(i);
  }, [budgets]);

  return (
    <div className="text-center">
      <h1 className={`${setMoneyColor(money)} text-3xl `}>
        {money.toFixed(2)}$
      </h1>
    </div>
  );
};

export default AllMoney;
