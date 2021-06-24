import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  handleArrowDownPressed,
  handleArrowUpPressed,
  handleEnterPressed,
} from '../../utils/handlers';

interface DropdownProps<T> {
  options: T[];
  optionSelected: T;
  htmlId?: string;
  setOptionSelected: React.Dispatch<React.SetStateAction<T>>;
}

type Selectable = { title: string; id: number };

const Dropdown = <T extends Selectable>({
  options,
  optionSelected,
  htmlId,
  setOptionSelected,
}: DropdownProps<T>): JSX.Element => {
  const [arrowOption, setArrowOption] = useState(0);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setArrowOption(options.indexOf(optionSelected));
  }, [visible, optionSelected, options]);

  const handleKeysPressed = (e: React.KeyboardEvent) => {
    let i = arrowOption;

    if (visible) {
      handleArrowUpPressed(e, () => {
        i--;
        if (i < 0) i = options.length - 1;
        setArrowOption(i);
      });

      handleArrowDownPressed(e, () => {
        i++;
        if (i === options.length) i = 0;
        setArrowOption(i);
      });
    }

    handleEnterPressed(
      e,
      !visible
        ? () => {
            setVisible(true);
            setActive(true);
          }
        : () => {
            setOptionSelected(options[i]);
            setVisible(false);
          }
    );
  };

  const renderOptions = (): JSX.Element[] => {
    return options.map((option, i) => {
      return (
        <div
          className={`transition px-5 py-2 cursor-pointer ${
            i === options.length - 1
              ? 'rounded-b-md'
              : i === 0
              ? 'rounded-t-md'
              : ''
          } ${arrowOption === i && 'bg-gray-200'}`}
          onClick={() => {
            setOptionSelected(option);
          }}
          onMouseMove={() => setArrowOption(i)}
          key={option.id}
        >
          {option.title}
        </div>
      );
    });
  };

  return (
    <>
      <div
        tabIndex={0}
        id={htmlId}
        onClick={() => {
          setVisible(true);
        }}
        onBlur={() => {
          setTimeout(() => setVisible(false), 200);
          setActive(false);
        }}
        onFocus={() => setActive(true)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => !visible && setActive(false)}
        onKeyDown={handleKeysPressed}
        className="focus:outline-none"
      >
        <div className={`flex justify-between focus:outline-none`}>
          <span
            className={`transition border-l border-t border-b rounded-l-lg mb-1 hover:border-blue-300 w-full px-5 py-2 ${
              active ? 'border-blue-300' : 'border-gray-200'
            }`}
          >
            {optionSelected ? optionSelected.title : ''}
          </span>
          <div
            className={`transition px-3 flex items-center transition border-r border-t border-b rounded-r-lg mb-1 py-2 ${
              active
                ? 'bg-gray-300 border-blue-300'
                : 'bg-white border-gray-200'
            }`}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      {optionSelected && (
        <div
          className={`transition border rounded-lg w-max min-w-32 overflow-hidden z-50 absolute bg-white opacity-${
            visible ? 100 : 0
          }`}
          style={{ pointerEvents: visible ? 'all' : 'none' }}
        >
          {renderOptions()}
        </div>
      )}
    </>
  );
};

export default Dropdown;
