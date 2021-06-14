import { Action, ActionTypes, TransactionType } from '../actions';
import { getUniqueId } from '../utils/functions';

export const transactionReducer = (
  state: TransactionType[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.addTransaction:
      action.payload.id = getUniqueId<TransactionType>(state);
      return [...state, action.payload];
    case ActionTypes.removeTransaction:
      return state.filter((e: TransactionType) => e.id !== action.payload);
    default:
      return state;
  }
};
