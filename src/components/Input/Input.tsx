import React, { FC } from 'react';

import { v4 as uuid } from 'uuid';

import InputWarning from '../../components/Warning/InputWarning';
import { handleEnterPressed } from '../../utils/handlers';

interface InputProps {
  value: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  warningShown?: boolean;
  htmlId?: string;
  labelTitle?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  handleEnterClick?: () => void;
}

const Input: FC<InputProps> = ({
  value,
  type,
  handleChange,
  placeholder,
  warningShown,
  htmlId,
  labelTitle,
  className,
  labelClassName,
  inputClassName,
  handleEnterClick,
}): JSX.Element => {
  if (!htmlId) htmlId = uuid();

  return (
    <div className={className}>
      {labelTitle && (
        <label htmlFor={htmlId} className={`${labelClassName} text-xl`}>
          {labelTitle}
        </label>
      )}

      <input
        className={`${inputClassName} input`}
        type={type}
        placeholder={placeholder}
        id={htmlId}
        value={value}
        onChange={handleChange}
        onKeyPress={e =>
          handleEnterClick && handleEnterPressed(e, handleEnterClick)
        }
      />
      {warningShown && <InputWarning />}
    </div>
  );
};

export default Input;
