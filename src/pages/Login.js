import { useRef, useState } from "react";
import useHttp from "../hooks/use-http";
import Input from "../components/ui/Input";
import styles from "./Form.module.scss";

const transformData = (data) => {
  console.log(data);
};

const Login = () => {
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [sendRequest] = useHttp();

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
  };

  // if (emailIsValid && passwordIsValid) {
  //   const data = {
  //     email: emailInputRef.current.value,
  //     password: passwordInputRef.current.value,
  //     returnSecureToken: true,
  //   };
  //   sendRequest(
  //     {
  //       url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGoU1U5Ot44r55vIA1XUglDmHyXhRUoic`,
  //       method: "POST",
  //       body: data,
  //       // headers: {
  //       //   "Content-Type": "application/json",
  //       // },
  //     },
  //     transformData
  //   );
  // }
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
