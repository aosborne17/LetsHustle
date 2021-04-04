import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Form, FormInput } from "../components/form";
import { signInCall } from "../utils/api/auth";
import "./SigninPage.css";

function SigninPage() {
  const [state, setState] = useState({
    email: null,
    password: null,
    errors: [],
  });

  const onSubmit = (event) => {
    event.preventDefault();
    signInCall(email, password, state, setState);
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  console.log(state);

  const { email, password, errors } = state;

  function renderError(errors) {
    if (!errors.length) {
      return;
    }

    const error = errors.find((error) => error.field === "name");

    return (
      <div>
        {errors.map((error) => (
          <p>{error.message}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="signInPage">
      <div className="signInPageBoxWrapper">
        <div className="signInPageBox">
          <div className="signInPage--welcome">
            <h2>Welcome</h2>
            <p>Login to get started!</p>
          </div>

          <Form className={"signInForm"} onSubmit={onSubmit}>
            <FormInput
              name="email"
              state={state}
              onChange={onChange}
              type={"email"}
              placeholder={"Email"}
              className="signInInput--email defaultInputStyling"
            />
            <FormInput
              state={state}
              onChange={onChange}
              name="password"
              type={"password"}
              placeholder={"Password"}
              className="signInInput--password defaultInputStyling"
            />
            {renderError(errors)}
            <div className="signInForm--forgotAndButton">
              <Button className={"signInForm--button defaultBtn"}>Login</Button>
              <Link to="/forgotpassword" className="signInForm--forgotPassword">
                Forgot Password?
              </Link>
            </div>
          </Form>
        </div>

        <div className="signInBox--footer">
          <p>
            First time here?{" "}
            <Link to="/signup" className="signIn--createAccount">
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
