import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Form, FormInput } from "../components/form";
import "./SigninPage.css";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

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
              state={email}
              setState={setEmail}
              type={"email"}
              placeholder={"Email"}
              className="signInInput--email defaultInputStyling"
            />
            <FormInput
              state={password}
              setState={setPassword}
              type={"password"}
              placeholder={"Password"}
              className="signInInput--password defaultInputStyling"
            />
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
