import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusSmIcon,
} from '@heroicons/react/solid';

export const setMoneyColor = (money: number): string => {
  if (money > 0) return 'text-green-500';
  else if (money < 0) return 'text-red-500';
  return 'text-black';
};

export const diffDisplay = (diff: number): JSX.Element => {
  if (diff < 0)
    return (
      <div className="text-red-500 text-lg">
        {diff.toFixed(2)}$
        <ChevronDownIcon className="w-5 h-5 m-auto" />
      </div>
    );
  else if (diff > 0)
    return (
      <div className="text-green-500 text-lg">
        {diff.toFixed(2)}$
        <ChevronUpIcon className="w-5 h-5 m-auto" />
      </div>
    );
  else
    return (
      <div className="text-lg">
        0.00$
        <MinusSmIcon className="w-5 h-5 m-auto" />
      </div>
    );
};
