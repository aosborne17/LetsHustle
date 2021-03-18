import axios from "axios";

export async function signupCall(email, password, setErrors) {
  try {
    const response = await axios.post("/api/users/signup", {
      email,
      password,
    });
    console.log(response.data);
  } catch (err) {
    setErrors(err.response.data.errors);
  }
}
