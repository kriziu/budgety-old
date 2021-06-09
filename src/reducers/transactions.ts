import { Action, ActionTypes, Transaction } from '../actions';
import { getUniqueId } from '../utils/functions';

export const transactionReducer = (
  state: Transaction[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.addTransaction:
      action.payload.id = getUniqueId<Transaction>(state);
      return [...state, action.payload];
    case ActionTypes.removeTransaction:
      return state.filter((e: Transaction) => e.id !== action.payload);
    default:
      return state;
  }
};
