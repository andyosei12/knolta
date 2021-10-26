import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui/ui-slice";

const useHttp = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestConfig, applyData = null, success = true) => {
      dispatch(uiActions.showLoadingSpinner());
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        if (applyData) {
          applyData(data);
        }
        dispatch(uiActions.closeLoadingSpinner());
        if (success) {
          dispatch(uiActions.setSuccessfulRequest());
        }
      } catch (error) {
        dispatch(uiActions.setHttpError("Something went wrong"));
        dispatch(uiActions.closeLoadingSpinner());
      }
    },
    [dispatch]
  );

  return [sendRequest];
};

export default useHttp;
