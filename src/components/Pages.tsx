import { FC } from 'react';

import { Route, Switch, useLocation } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import BudgetsPage from '../pages/BudgetsPage';
import PaymentsPage from '../pages/PaymentsPage';
import StatisticsPage from '../pages/StatisticsPage';

import './styles/animations.css';

const Pages: FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={200} classNames="fade" key={location.key}>
        <Switch location={location}>
          <Route exact path="/">
            <BudgetsPage />
          </Route>
          <Route exact path="/budgets">
            <BudgetsPage />
          </Route>
          <Route exact path="/payments">
            <PaymentsPage />
          </Route>
          <Route exact path="/statistics">
            <StatisticsPage />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Pages;
