import { combineReducers } from 'redux';
import { BudgetProps } from '../actions';
import { Transaction } from '../actions/transactions';
import { budgetsReducer } from './budgets';
import { transactionReducer } from './transactions';

export interface StoreState {
  budgets: BudgetProps[];
  transaction: Transaction[];
}

export const reducers = combineReducers<StoreState>({
  budgets: budgetsReducer,
  transaction: transactionReducer,
});
