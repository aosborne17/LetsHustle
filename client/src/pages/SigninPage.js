import React, { useState } from "react";
import { Form, FormInput } from "../components/form";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormInput
          state={email}
          setState={setEmail}
          type={"email"}
          placeholder={"email"}
          className=""
        />
        <FormInput
          state={password}
          setState={setPassword}
          type={"password"}
          placeholder={"password"}
          className=""
        />
      </Form>
    </div>
  );
}

export default SigninPage;
