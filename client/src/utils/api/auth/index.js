import ajax from "../../../axios";

export async function signupCall(email, password, setErrors) {
  try {
    const response = await ajax.post("/api/users/signup", {
      email,
      password,
    });
    console.log(response.data);
  } catch (err) {
    setErrors(err.response.data.errors);
  }
}

export async function signInCall(email, password, state, setState) {
  const response = await ajax
    .post("/api/users/signin", {
      email,
      password,
    })
    .then((res) => {
      console.log(res.data);

      // dispatch user details into login reducer
    })
    .catch((err) =>
      setState({
        ...state,
        errors: err.response.data.errors,
      })
    );
}
