import { useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui/ui-slice";
import AuthContext from "../auth/auth-context";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import styles from "./Form.module.scss";
import loaderStyles from "../components/ui/Loader.module.scss";

const Login = () => {
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const httpError = useSelector((state) => state.ui.httpError);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const authCtx = useContext(AuthContext);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setInputIsTouched(true);

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!email.includes("@") || password.length < 7) {
      if (email.includes("@")) {
        setEmailIsValid(true);
        return;
      }
      if (password.length > 7) {
        setPasswordIsValid(true);
        return;
      }
    }

    setPasswordIsValid(true);
    setEmailIsValid(true);

    (async function () {
      try {
        dispatch(uiActions.showLoadingSpinner());
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGoU1U5Ot44r55vIA1XUglDmHyXhRUoic",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Invalid Email or Password. Try again");
        }
        const data = await response.json();
        if (data.idToken) {
          authCtx.login(data.idToken);
        }
      } catch (error) {
        dispatch(uiActions.setHttpError(error.message));
      } finally {
        dispatch(uiActions.closeLoadingSpinner());
      }
    })();
  };

  return (
    <form onSubmit={submitFormHandler} className={styles.form}>
      <h1>Login</h1>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__message">{httpError}</p>}
      {!emailIsValid && inputIsTouched && (
        <p className="error__message">Enter a valid email</p>
      )}
      <Input
        label="Email"
        ref={emailInputRef}
        input={{
          type: "email",
          name: "email",
          placeholder: "Enter email",
        }}
      />
      {!passwordIsValid && inputIsTouched && (
        <p className="error__message">
          Password length should be greater or equal to 7
        </p>
      )}
      <Input
        label="Password"
        ref={passwordInputRef}
        input={{
          type: "password",
          name: "password",
          placeholder: "Enter password",
        }}
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default Login;
