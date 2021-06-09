import { FC } from 'react';

import { MenuIcon, XIcon } from '@heroicons/react/solid';

import '../styles/animations.css';

interface NavBarProps {
  navOpened: boolean;
  onIconClick: () => void;
}

const NavBar: FC<NavBarProps> = ({ navOpened, onIconClick }): JSX.Element => {
  // TODO ROUTING
  return (
    <nav className="flex items-center justify-between flex-wrap mb-10 text-xl">
      <h1 className="text-4xl">Budgety</h1>

      <div className="block md:hidden cursor-pointer" onClick={onIconClick}>
        {navOpened ? (
          <XIcon className="h-6 w-6 text-black" />
        ) : (
          <MenuIcon className="h-6 w-6 text-black" />
        )}
      </div>

      <div
        className={`transition md:opacity-100 md:w-auto md:mt-0 w-full ${
          navOpened ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between">
          <a href="/" className="hover:underline text-center mt-10 md:mt-0">
            Overview
          </a>
          <a
            href="/"
            className="sm:ml-6 lg:ml-10 hover:underline text-center mt-10 md:mt-0"
          >
            Budgets
          </a>
          <a
            href="/"
            className="sm:ml-6 lg:ml-10 hover:underline text-center mt-10 md:mt-0"
          >
            Payments
          </a>
          <a
            href="/"
            className="sm:ml-6 lg:ml-10 hover:underline text-center mt-10 md:mt-0"
          >
            Statistics
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
