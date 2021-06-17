import ReactDOM from 'react-dom';
import './index.css';
import { createStore, compose } from 'redux';

import App from './components/App';

import { reducers } from './reducers';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localstorage/localStorage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEncharcers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

export const store = createStore(reducers, persistedState, composeEncharcers());
store.subscribe((): void => {
  const newState = store.getState();
  saveState({
    budgets: newState.budgets,
    transactions: newState.transactions,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
