import { combineReducers } from 'redux';
import { BudgetType } from '../actions';
import { TransactionType } from '../actions/transactions';
import { budgetsReducer } from './budgets';
import { transactionReducer } from './transactions';

export interface StoreState {
  budgets: BudgetType[];
  transactions: TransactionType[];
}

export const reducers = combineReducers<StoreState>({
  budgets: budgetsReducer,
  transactions: transactionReducer,
});
