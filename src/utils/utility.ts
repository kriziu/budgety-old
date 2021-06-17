export interface HasID {
  id: number;
}

export const getUniqueId = <T extends HasID>(array: T[]): number => {
  if (!array.length) return 0;
  return array[array.length - 1].id + 1;
};

export const getItemById = <T extends HasID>(array: T[], id: number): T => {
  const item = array.filter(item => {
    return item.id === id;
  })[0];

  if (item) return item;
  return array[0];
};

// DATE
export const getDateString = (date: Date): string => {
  const newDate = new Date(date);

  return `${(newDate.getDate() < 10 ? '0' : '') + newDate.getDate()}.${
    (newDate.getMonth() + 1 < 10 ? '0' : '') + (newDate.getMonth() + 1)
  }.${newDate.getFullYear()}`;
};

export const getTimeString = (date: Date): string => {
  const newDate = new Date(date);

  return `${(newDate.getHours() < 10 ? '0' : '') + newDate.getHours()}:${
    (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()
  }`;
};
