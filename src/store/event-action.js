import { eventActions } from "./events-slice";
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
      dispatch(uiActions.setHttpError("Something went wrong"));
      dispatch(uiActions.closeLoadingSpinner());
    }
  };
};

export const fetchEvent = () => {
  return async (dispatch) => {
    dispatch(uiActions.showLoadingSpinner());

    const fetchRequest = async () => {
      const response = await fetch(
        "https://knolta-beb08-default-rtdb.firebaseio.com/events.json"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          venue: data[key].venue,
          date: data[key].date,
        });

        // loadedData.push(events);
      }

      return loadedData;
    };

    try {
      const data = await fetchRequest();
      dispatch(eventActions.getEvents(data));
      dispatch(uiActions.closeLoadingSpinner());
    } catch (error) {
      dispatch(uiActions.setHttpError("Something went wrong"));
      dispatch(uiActions.closeLoadingSpinner());
    }
  };
};
