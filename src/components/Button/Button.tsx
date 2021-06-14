import { FC } from 'react';

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  title,
  className,
  onClick,
  disabled,
}): JSX.Element => {
  return (
    <button
      className={`${className} transition rounded-lg w-full px-5 py-1 text-black`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
