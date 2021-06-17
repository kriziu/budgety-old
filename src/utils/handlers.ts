export const handleEnterPressed = (
  event: React.KeyboardEvent<HTMLInputElement>,
  action: () => void
): void => {
  if (event.key === 'Enter') action();
};
