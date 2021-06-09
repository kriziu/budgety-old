import { FC } from 'react';

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  title,
  className,
  onClick,
}): JSX.Element => {
  return (
    <button
      className={`${className} transition rounded-lg w-full px-5 py-1 text-black h-10`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
