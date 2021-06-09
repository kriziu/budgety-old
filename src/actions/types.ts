import {
  AddBudgetAction,
  DeleteBudgetAction,
  EditBudgetAction,
} from './budgets';
import {
  AddTransactionAction,
  DeleteTransactionAction,
  TransactionsChangeAction,
} from './transactions';

export enum ActionTypes {
  addBudget,
  editBudget,
  removeBudget,
  addTransaction,
  editTransaction,
  removeTransaction,
  transactionsChange,
}

export type Action =
  | AddBudgetAction
  | EditBudgetAction
  | DeleteBudgetAction
  | AddTransactionAction
  | DeleteTransactionAction
  | TransactionsChangeAction;
