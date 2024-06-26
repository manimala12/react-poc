import { ExpenditureDetailsConstants } from "../../constants";
import { Dispatch } from "redux";
import axios from "axios";
import { AppDataAction } from "../../../types";
import { AppState } from "../../store";
import { ExpenditureDetailsValues } from "../../../pages/Expenditures/types";
import { errorHandler } from "../../../helpers";

export const getExpenditureDetailsAction = () => {
  return async (
    dispatch: Dispatch<AppDataAction>,
    getState: () => AppState
  ) => {
    try {
      const state = getState();
      const userEmail = state.auth.email;
      const expenditureDetails = state.appData.expenditureDetails;
      if (expenditureDetails) {
        return;
      }

      dispatch({
        type: ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_REQUEST,
      });
      const res = await axios.get<ExpenditureDetailsValues[]>(
        `http://localhost:8000/expenditures?email=${userEmail}`
      );

      if (res.status === 200) {
        dispatch({
          type: ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_SUCCESS,
          payload: {
            message: "Expenditure details fetched successfully",
            expenditureDetails: res.data[0],
          },
        });
        return;
      }
      throw new Error("Something went wrong");
    } catch (error) {
      errorHandler(
        error as Error,
        dispatch,
        ExpenditureDetailsConstants.GET_EXPENDITURE_DETAILS_FAILURE
      );
    }
  };
};
