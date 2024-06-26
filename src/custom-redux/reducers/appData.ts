import {
  ClearAppDataConstants,
  ExpenditureDetailsConstants,
  GetDecisionConstants,
  IncomeDetailsConstants,
  LoanDetailsConstants,
  NavigationConstants,
  PersonalDetailsConstants,
} from "../constants";
import { AppData, AppDataAction, AppRoutes } from "../../types";

const initState: AppData = {
  loanDetails: undefined,
  personalDetails: undefined,
  incomeDetails: undefined,
  expenditureDetails: undefined,
  loading: false,
  message: undefined,
  error: undefined,
  navigatedFrom: AppRoutes.HOME,
};

export const appDataReducer = (
  state: AppData = initState,
  action: AppDataAction
): AppData => {
  switch (action.type) {
    case LoanDetailsConstants.GET_LOAN_DETAILS_REQUEST:
    case LoanDetailsConstants.SAVE_LOAN_DETAILS_REQUEST:
    case PersonalDetailsConstants.GET_PERSONAL_DETAILS_REQUEST:
    case PersonalDetailsConstants.SAVE_PERSONAL_DETAILS_REQUEST:
    case IncomeDetailsConstants.GET_INCOME_DETAILS_REQUEST:
    case IncomeDetailsConstants.SAVE_INCOME_DETAILS_REQUEST:
    case ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_REQUEST:
    case ExpenditureDetailsConstants.SAVE_EXPENDITURE_DETAILS_REQUEST:
    case GetDecisionConstants.SAVE_DECISION_REQUEST:
    case ClearAppDataConstants.CLEAR_APP_DATA_REQUEST:
    case NavigationConstants.NAVIGATED_FROM_REQUEST:
      return {
        ...state,
        loading: true,
        message: undefined,
        error: undefined,
      };

    case LoanDetailsConstants.SAVE_LOAN_DETAILS_SUCCESS:
    case LoanDetailsConstants.GET_LOAN_DETAILS_SUCCESS:
    case PersonalDetailsConstants.SAVE_PERSONAL_DETAILS_SUCCESS:
    case PersonalDetailsConstants.GET_PERSONAL_DETAILS_SUCCESS:
    case IncomeDetailsConstants.GET_INCOME_DETAILS_SUCCESS:
    case IncomeDetailsConstants.SAVE_INCOME_DETAILS_SUCCESS:
    case ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_SUCCESS:
    case ExpenditureDetailsConstants.SAVE_EXPENDITURE_DETAILS_SUCCESS:
    case GetDecisionConstants.SAVE_DECISION_SUCCESS:
    case NavigationConstants.NAVIGATED_FROM_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case LoanDetailsConstants.SAVE_LOAN_DETAILS_FAILURE:
    case LoanDetailsConstants.GET_LOAN_DETAILS_FAILURE:
    case PersonalDetailsConstants.GET_PERSONAL_DETAILS_FAILURE:
    case PersonalDetailsConstants.SAVE_PERSONAL_DETAILS_FAILURE:
    case IncomeDetailsConstants.GET_INCOME_DETAILS_FAILURE:
    case IncomeDetailsConstants.SAVE_INCOME_DETAILS_FAILURE:
    case ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_FAILURE:
    case ExpenditureDetailsConstants.SAVE_EXPENDITURE_DETAILS_FAILURE:
    case GetDecisionConstants.SAVE_DECISION_FAILURE:
    case NavigationConstants.NAVIGATED_FROM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      };

    case ClearAppDataConstants.CLEAR_APP_DATA_SUCCESS:
      return { ...initState };

    default:
      return state;
  }
};
