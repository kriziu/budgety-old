import { ActionTypes } from './';

export interface BudgetType {
  id: number;
  title: string;
  amount: { actual: number; starting: number; diff: number };
  date: Date;
}

export interface AddBudgetAction {
  type: ActionTypes.addBudget;
  payload: BudgetType;
}

export interface EditBudgetAction {
  type: ActionTypes.editBudget;
  payload: BudgetType;
}

export interface DeleteBudgetAction {
  type: ActionTypes.removeBudget;
  payload: number;
}

export const addBudget = (budget: BudgetType): AddBudgetAction => {
  return {
    type: ActionTypes.addBudget,
    payload: budget,
  };
};

export const editBudget = (budget: BudgetType): EditBudgetAction => {
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
