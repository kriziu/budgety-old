import { FC } from 'react';
import Button from './Button';

interface ButtonSecondaryProps {
  title?: string;
  icon?: JSX.Element;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  title,
  icon,
  color,
  className,
  onClick,
}): JSX.Element => {
  return (
    <Button
      title={title}
      icon={icon}
      color="white"
      borderColor={color}
      textColor={color}
      hoverTextColor="white"
      hoverColor={color}
      borderWidth="2"
      className={className}
      onClick={onClick}
    />
  );
};

export default ButtonSecondary;
