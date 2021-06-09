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
