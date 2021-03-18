import { useState } from "react";
import { signupCall } from "../utils/api/auth";
import { Form, FormInput } from "../components/form";
import { Button } from "../components/button";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    signupCall(email, password, setErrors);
  };

  console.log(errors);

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div>
          <FormInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"text"}
            placeholder={"email"}
            className=""
          />
          {errors.length ? (
            <div>
              {errors
                .filter((error) => error.field === "email")
                .map((err) => (
                  <li>{err.message}</li>
                ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          placeholder={"password"}
          className=""
        />
        {errors.length ? (
          <div>
            {errors
              .filter((error) => error.field === "password")
              .map((err) => (
                <li>{err.message}</li>
              ))}
          </div>
        ) : (
          ""
        )}
        <Button type={"submit"}>Sign up</Button>
      </Form>
    </div>
  );
}

export default SignupPage;
