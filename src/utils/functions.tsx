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

interface HasID {
  id: number;
}

export const getUniqueId = <T extends HasID>(array: T[]): number => {
  if (!array.length) return 0;
  return array[array.length - 1].id + 1;
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

export const handleEnterPressed = (
  event: React.KeyboardEvent<HTMLInputElement>,
  action: () => void
): void => {
  if (event.key === 'Enter') action();
};

export const getItemById = <T extends HasID>(array: T[], id: number): T => {
  const item = array.filter(item => {
    return item.id === id;
  })[0];

  if (item) return item;
  return array[0];
};
