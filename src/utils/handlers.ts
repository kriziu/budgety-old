export const handleEnterPressed = (
  event: React.KeyboardEvent,
  action: () => void
): void => {
  if (event.key === 'Enter') action();
};

export const handleArrowUpPressed = (
  event: React.KeyboardEvent,
  action: () => void
): void => {
  if (event.key === 'ArrowUp') action();
};

export const handleArrowDownPressed = (
  event: React.KeyboardEvent,
  action: () => void
): void => {
  if (event.key === 'ArrowDown') action();
};
