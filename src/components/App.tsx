import { FC, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Pages from './Pages';
import './styles/animations.css';

const App: FC = (): JSX.Element => {
  const [navOpened, setNavOpened] = useState(false);

  const handleNavClick = (): void => setNavOpened(!navOpened);

  return (
    <BrowserRouter>
      <div className="w-full xl:w-3/4 m-auto p-8">
        <NavBar navOpened={navOpened} onIconClick={handleNavClick} />
        <main
          className={`transition-all transform md:-translate-y-0 ${
            navOpened ? '-translate-y-0' : 'sm:-translate-y-20 -translate-y-72'
          }`}
        >
          <Pages />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
