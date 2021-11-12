import { useRef, useState } from "react";
import Input from "../components/ui/Input";
import styles from "./Form.module.scss";

const Login = () => {
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("Form is submitted");
    setInputIsTouched(true);

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (email.includes("@")) {
      setEmailIsValid(true);
    }
    if (password.trim().length >= 7) {
      setPasswordIsValid(true);
    }
  };

  if (emailIsValid && passwordIsValid) {
    console.log("You will be logged in");
  }
  return (
    <form onSubmit={submitFormHandler} className={styles.form}>
      <h1>Login</h1>
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
