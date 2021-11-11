import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";

import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import formStyles from "./Form.module.scss";
import loaderStyles from "../components/ui/Loader.module.scss";

const EditExecutive = () => {
  const [fetchExecutive] = useHttp();
  const [sendRequest] = useHttp();
  const [executive, setExecutive] = useState(null);
  const params = useParams();
  const nameRef = useRef();
  const positionRef = useRef();
  const httpError = useSelector((state) => state.ui.httpError);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const navigate = useNavigate();

  const { executiveId } = params;
  const applyData = useCallback((data) => {
    setExecutive(data);
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      position: positionRef.current.value,
    };
    sendRequest({
      url: `https://shccknolta-default-rtdb.firebaseio.com/executives/${executiveId}.json`,
      method: "PATCH",
      body: data,
    }).then(() => navigate("/executives"));
  };

  useEffect(() => {
    fetchExecutive(
      {
        url: `https://shccknolta-default-rtdb.firebaseio.com/executives/${executiveId}.json`,
      },
      applyData
    );
  }, [fetchExecutive, executiveId, applyData]);
  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      {!httpError && executive && (
        <form onSubmit={submitFormHandler} className={formStyles.form}>
          <h3>Edit Executive</h3>
          <Input
            label="Position"
            ref={positionRef}
            input={{
              type: "text",
              name: "position",
              defaultValue: executive.position,
            }}
          />
          <Input
            label="Name"
            ref={nameRef}
            input={{ type: "text", name: "name", defaultValue: executive.name }}
          />
          <button className="btn">Update</button>
        </form>
      )}
    </Fragment>
  );
};

export default EditExecutive;
