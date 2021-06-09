import { Action, ActionTypes, BudgetProps, Transaction } from '../actions';
import { getUniqueId } from '../utils/functions';

const calcDiffAmount = ({ amount }: BudgetProps): number => {
  return amount.actual - amount.starting;
};

export const budgetsReducer = (state: BudgetProps[] = [], action: Action) => {
  let newState: BudgetProps[];

  switch (action.type) {
    // ADDING
    case ActionTypes.addBudget:
      action.payload.id = getUniqueId<BudgetProps>(state);
      return [...state, action.payload];

    // EDITING
    case ActionTypes.editBudget:
      action.payload.amount.diff = calcDiffAmount(action.payload);
      newState = state.map((budget: BudgetProps) => {
        if (budget.id === action.payload.id) {
          return action.payload;
        } else return budget;
      });
      return newState;

    // REMOVING
    case ActionTypes.removeBudget:
      return state.filter(
        (budget: BudgetProps) => budget.id !== action.payload
      );

    // TRANSACTION CHANGE
    case ActionTypes.transactionsChange:
      newState = state.map((budget: BudgetProps) => {
        budget.amount.actual = budget.amount.starting; // RESET

        action.payload.forEach((transaction: Transaction) => {
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
