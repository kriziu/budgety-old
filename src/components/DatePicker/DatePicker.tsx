import { FC } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const DatePicker: FC = (): JSX.Element => {
  const renderDays = (): JSX.Element[] => {
    let arr: number[] = [];

    for (let i = 0; i <= 30; i++) {
      arr.push(i);
    }

    return arr.map((day, i) => {
      return (
        <p
          key={i}
          className="transition hover:bg-gray-200 px-1 py-1 cursor-pointer"
        >
          {day + 1}
        </p>
      );
    });
  };

  return (
    <>
      <div className="transition w-64 border rounded-md pl-4 bg-white hover:bg-gray-50 bg-opacity-50 flex justify-between items-center">
        <div>22 June 2021</div>
        <div className="bg-gray-200 rounded-r-sm p-1">
          <CalendarIcon className="w-6 h-6 text-gray-500" />
        </div>
      </div>
      <div className="w-64 border rounded-md mt-1">
        <div className="flex text-gray-600 justify-around text-center font-medium cursor-pointer">
          <div className="transition rounded-l-sm hover:bg-gray-200">
            <ChevronLeftIcon className="w-8 h-8 p-1" />
          </div>
          <div className="transition p-1 flex-grow hover:bg-gray-200">June</div>
          <div className="transition p-1 flex-grow hover:bg-gray-200">2021</div>
          <div className="transition rounded-r-sm hover:bg-gray-200">
            <ChevronRightIcon className="w-8 h-8 p-1" />
          </div>
        </div>
        <div
          className="grid justify-center mt-2 text-center font-medium text-gray-600"
          style={{ gridTemplateColumns: 'repeat(auto-fit, 2.2rem)' }}
        >
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div
          className="grid justify-center text-center"
          style={{ gridTemplateColumns: 'repeat(auto-fit, 2.2rem)' }}
        >
          {renderDays()}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
