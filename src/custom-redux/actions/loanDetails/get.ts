import { LoanDetailsConstants } from "../../constants";
import { Dispatch } from "redux";
import axios from "axios";
import { AppDataAction } from "../../../types";
import { LoanDetailsValues } from "../../../pages/LoanDetails/types";
import { AppState } from "../../store";
import { errorHandler } from "../../../helpers";

export const getLoanDetailsAction = () => {
  return async (
    dispatch: Dispatch<AppDataAction>,
    getState: () => AppState
  ) => {
    try {
      const state = getState();
      const userEmail = state.auth.email;
      const loanDetails = state.appData.loanDetails;
      if (loanDetails) {
        return;
      }

      dispatch({ type: LoanDetailsConstants.GET_LOAN_DETAILS_REQUEST });

      const res = await axios.get<LoanDetailsValues[]>(
        `http://localhost:8000/loan-details?email=${userEmail}`
      );

      if (res.status === 200) {
        dispatch({
          type: LoanDetailsConstants.GET_LOAN_DETAILS_SUCCESS,
          payload: {
            message: "Loan details fetched successfully",
            loanDetails: res.data[0],
          },
        });
        return;
      }
      throw new Error("Something went wrong");
    } catch (error) {
      errorHandler(
        error as Error,
        dispatch,
        LoanDetailsConstants.GET_LOAN_DETAILS_FAILURE
      );
    }
  };
};
