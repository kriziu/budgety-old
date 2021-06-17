import { Action, ActionTypes, BudgetType, TransactionType } from '../actions';
import { getUniqueId } from '../utils/utility';

const calcDiffAmount = ({ amount }: BudgetType): number => {
  return amount.actual - amount.starting;
};

export const budgetsReducer = (state: BudgetType[] = [], action: Action) => {
  let newState: BudgetType[];

  switch (action.type) {
    // ADDING
    case ActionTypes.addBudget:
      action.payload.id = getUniqueId<BudgetType>(state);
      return [...state, action.payload];

    // EDITING
    case ActionTypes.editBudget:
      newState = state.map((budget: BudgetType) => {
        if (budget.id === action.payload.id) {
          return action.payload;
        } else return budget;
      });
      return newState;

    // REMOVING
    case ActionTypes.removeBudget:
      return state.filter((budget: BudgetType) => budget.id !== action.payload);

    // TRANSACTION CHANGE
    case ActionTypes.transactionsChange:
      newState = state.map((budget: BudgetType) => {
        budget.amount.actual = budget.amount.starting; // RESET

        action.payload.forEach((transaction: TransactionType) => {
          if (transaction.budgetId === budget.id) {
            budget.amount.actual += transaction.amount;
          }
        });
        budget.amount.diff = calcDiffAmount(budget);
        return budget;
      });
      return newState;

    default:
      return state;
  }
};
