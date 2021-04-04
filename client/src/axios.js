import axios from "axios";

const ajax = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "//therealapi.com/",
});

export default ajax;
