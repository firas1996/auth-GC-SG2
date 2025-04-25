import { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthStore from "../../store/AuthContext";
import axios from "axios";

const emailReducer = (prevState, actions) => {
  switch (actions.name) {
    case "user 9a3ed yekteb":
      return { value: actions.payload, isValid: actions.payload.includes("@") };
    case "user 5raj mel input":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: null };
  }
};
const passwordReducer = (prevState, actions) => {
  switch (actions.name) {
    case "user 9a3ed yekteb":
      return {
        value: actions.payload,
        isValid: actions.payload.trim().length > 6,
      };
    case "user 5raj mel input":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: null };
  }
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const testLogin = async (email, password) => {
    try {
      const res = await axios.post("http://10.33.2.3:7777/users/login", {
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const ctx = useContext(AuthStore);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // debouncing
    const timer = setTimeout(() => {
      console.log("effect");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    // cleanup function
    return () => {
      clearTimeout(timer);
      console.log("cleanup");
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ name: "user 9a3ed yekteb", payload: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      name: "user 9a3ed yekteb",
      payload: event.target.value,
    });
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({ name: "user 5raj mel input" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ name: "user 5raj mel input" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    // ctx.login(emailState.value, passwordState.value);
    testLogin(emailState.value, passwordState.value);
  };

  return (
    <AuthStore.Provider
      value={{
        email: emailState.value,
        password: passwordState.value,
      }}
    >
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </AuthStore.Provider>
  );
};

export default Login;
