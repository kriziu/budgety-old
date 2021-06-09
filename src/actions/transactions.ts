import { store } from '..';
import { ActionTypes } from './';

export interface Transaction {
  id: number;
  budgetId: number;
  title: string;
  amount: number;
  date: Date;
}

export interface AddTransactionAction {
  type: ActionTypes.addTransaction;
  payload: Transaction;
}

// export interface EditTransactionAction {
//   type: ActionTypes.editTransaction;
//   payload: Transaction;
// }

export interface DeleteTransactionAction {
  type: ActionTypes.removeTransaction;
  payload: number;
}

export interface TransactionsChangeAction {
  type: ActionTypes.transactionsChange;
  payload: Transaction[];
}

export const addTransaction = (
  transaction: Transaction
): AddTransactionAction => {
  return {
    type: ActionTypes.addTransaction,
    payload: transaction,
  };
};

// export const editTransaction = (transaction: Transaction): EditTransactionAction => {
//   return {
//     type: ActionTypes.editTransaction,
//     payload: transaction,
//   };
// };

export const deleteTransaction = (id: number): DeleteTransactionAction => {
  return {
    type: ActionTypes.removeTransaction,
    payload: id,
  };
};

export const transactionsChange = (): TransactionsChangeAction => {
  return {
    type: ActionTypes.transactionsChange,
    payload: store.getState().transaction,
  };
};
