import { store } from '..';
import { ActionTypes } from './';

export interface TransactionType {
  id: number;
  budgetId: number;
  title: string;
  amount: number;
  date: Date;
}

export interface AddTransactionAction {
  type: ActionTypes.addTransaction;
  payload: TransactionType;
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
  payload: TransactionType[];
}

export const addTransaction = (
  transaction: TransactionType
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
    payload: store.getState().transactions,
  };
};
