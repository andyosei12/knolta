import { uiActions } from "./ui/ui-slice";

export const sendEvent = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.showLoadingSpinner());

    const sendRequest = async () => {
      const response = await fetch(
        "https://knolta-beb08-default-rtdb.firebaseio.com/events.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.closeLoadingSpinner());
      dispatch(uiActions.setSuccessfulRequest());
    } catch (error) {
      dispatch(uiActions.setHttpError(error.message));
      dispatch(uiActions.closeLoadingSpinner());
    }
  };
};
