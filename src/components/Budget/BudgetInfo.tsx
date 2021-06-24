import { FC } from 'react';
import { BudgetType } from '../../actions';
import { diffDisplay, setMoneyColor } from '../../utils/ui';
import { getDateString } from '../../utils/utility';

interface BudgetInfoProps {
  budget: BudgetType;
}

const BudgetInfo: FC<BudgetInfoProps> = ({ budget }): JSX.Element => {
  const { title, amount, date } = budget;

  return (
    <div className="text-center w-full h-38">
      <h1 className="text-2xl tracking-wide">{title}</h1>
      <h3 className="text-sm mt-1">{getDateString(date)}</h3>
      <h1 className={`text-3xl ${setMoneyColor(amount.actual)} mt-1`}>
        {amount.actual.toFixed(2)}$
      </h1>
      <span className="flex w-2/3 m-auto justify-around mt-1">
        {diffDisplay(amount.diff)}
      </span>
    </div>
  );
};

export default BudgetInfo;
