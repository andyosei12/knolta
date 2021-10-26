import { Fragment, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";

import styles from "../styles/Form/Form.module.css";
import primarybtnstyles from "../styles/Button/PrimaryButton.module.css";
import loaderStyles from "../styles/Loader/Loader.module.css";

const ExecutiveForm = () => {
  const positionInputRef = useRef();
  const nameInputRef = useRef();
  const [formIsInValid, setFormIsInValid] = useState(false);
  const [sendRequest] = useHttp();
  const history = useHistory();
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const data = {
      position: positionInputRef.current.value,
      name: nameInputRef.current.value,
    };

    if (data.position.trim() === "" || data.name.trim() === "") {
      setFormIsInValid(true);
      return;
    } else {
      setFormIsInValid(false);
    }
    sendRequest({
      url: `https://knolta-beb08-default-rtdb.firebaseio.com/executives.json`,
      method: "POST",
      body: data,
    }).then(() => history.push("/executives"));
  };
  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      {!httpError && (
        <form className={styles.form} onSubmit={submitFormHandler}>
          <h3>Add an event</h3>
          {formIsInValid && (
            <p className="error__message">All fields are required</p>
          )}
          <Input
            label="position"
            ref={positionInputRef}
            input={{
              type: "text",
              name: "position",
              placeholder: "Enter Position",
            }}
          />
          <Input
            label="name"
            ref={nameInputRef}
            input={{
              type: "text",
              name: "name",
              placeholder: "Enter name",
            }}
          />
          <button type="submit" className={primarybtnstyles.btn}>
            Submit
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default ExecutiveForm;
