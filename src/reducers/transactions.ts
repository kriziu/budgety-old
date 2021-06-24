import { Action, ActionTypes, TransactionType } from '../actions';
import { getUniqueId } from '../utils/utility';

export const transactionReducer = (
  state: TransactionType[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.addTransaction:
      action.payload.id = getUniqueId<TransactionType>(state);
      if (!action.payload.title) action.payload.title = '[No title]';
      return [...state, action.payload];
    case ActionTypes.removeTransaction:
      return state.filter((e: TransactionType) => e.id !== action.payload);
    default:
      return state;
  }
};
