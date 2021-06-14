import { FC } from 'react';
import { BudgetType } from '../../actions';
import { diffDisplay, setMoneyColor } from '../../utils/functions';

interface BudgetInfoProps {
  budget: BudgetType;
}

const BudgetInfo: FC<BudgetInfoProps> = ({ budget }): JSX.Element => {
  const { title, amount } = budget;

  return (
    <div className="text-center w-full h-32">
      <h1 className="text-2xl tracking-wide">{title}</h1>
      <h1 className={`text-3xl ${setMoneyColor(amount.actual)} mt-1`}>
        {amount.actual.toFixed(2)}$
      </h1>
      <div className="flex w-2/3 m-auto justify-around mt-1">
        {diffDisplay(amount.diff)}
      </div>
    </div>
  );
};

export default BudgetInfo;
