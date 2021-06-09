import { ActionTypes } from './';

export interface BudgetProps {
  id: number;
  title: string;
  amount: { actual: number; starting: number; diff: number };
  date: Date;
}

export interface AddBudgetAction {
  type: ActionTypes.addBudget;
  payload: BudgetProps;
}

export interface EditBudgetAction {
  type: ActionTypes.editBudget;
  payload: BudgetProps;
}

export interface DeleteBudgetAction {
  type: ActionTypes.removeBudget;
  payload: number;
}

export const addBudget = (budget: BudgetProps): AddBudgetAction => {
  return {
    type: ActionTypes.addBudget,
    payload: budget,
  };
};

export const editBudget = (budget: BudgetProps): EditBudgetAction => {
  return {
    type: ActionTypes.editBudget,
    payload: budget,
  };
};

export const deleteBudget = (id: number): DeleteBudgetAction => {
  return {
    type: ActionTypes.removeBudget,
    payload: id,
  };
};
