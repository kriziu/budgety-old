import { FC } from 'react';

interface ButtonProps {
  color?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  title?: string;
  icon?: JSX.Element;
  width?: string | number;
  height?: string | number;
  borderWidth?: string | number;
  padding?: string | number;
  pX?: string | number;
  pY?: string | number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  color = 'white',
  borderColor,
  textColor = 'white',
  hoverColor,
  hoverTextColor,
  title,
  icon,
  width = 'full',
  height,
  borderWidth = 4,
  padding = 1,
  pY,
  pX,
  className,
  onClick,
  disabled = false,
}): JSX.Element => {
  let tint = parseInt(color?.split('-')[1]);
  color = color.split('-')[0];

  const hoverTint = tint === 900 ? 'black' : `${color}-${tint + 100}`;

  borderColor = borderColor ? borderColor : `${color}-${tint}`;
  hoverColor = hoverColor ? hoverColor : hoverTint;
  hoverTextColor = hoverTextColor ? hoverTextColor : textColor;

  return (
    <button
      className={`${className} transition rounded-lg w-${width} h-${height} p-${padding} px-${pX} py-${pY} text-${textColor} bg-${color}-${tint} border-${borderWidth} border-${borderColor} hover:bg-${hoverColor} hover:border-${hoverColor} hover:text-${hoverTextColor} focus:outline-none focus:shadow-outline focus:border-gray-300 active:bg-gray-300 ${
        disabled && 'cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {title} {icon}
    </button>
  );
};

export default Button;
