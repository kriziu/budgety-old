import { FC, useState } from 'react';

import BudgetList from './Budget/BudgetList';
import InputBudget from './InputBudget/InputBudget';
import NavBar from './NavBar/NavBar';

const App: FC = (): JSX.Element => {
  const [navOpened, setNavOpened] = useState(false);

  const handleNavClick = (): void => setNavOpened(!navOpened);

  return (
    <div className="w-full xl:w-3/4 m-auto p-8">
      <NavBar navOpened={navOpened} onIconClick={handleNavClick} />
      <main
        className={`transition-all transform md:-translate-y-0 ${
          navOpened ? '-translate-y-0' : 'sm:-translate-y-20 -translate-y-72'
        }`}
      >
        <InputBudget />
        <BudgetList />
      </main>
    </div>
  );
};

export default App;
