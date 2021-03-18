import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { signUpRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true); // so express is aware its behind the nginx ingress proxy
app.use(json());
app.use(
  cookieSession({
    // we arent encrypting our cookie as the JWT within it is encrypted
    // this also means that wif we incorporate other programming languages into different services
    // there wont be any decrytion issues
    signed: false,
    // when true this means we will only set a cookie on https connection
    // when we run jest tests, it will change node_env to test, so we will be able to set a cookie on non secure http
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signUpRouter);

// so any route that isn't defined above will throw this error
app.all("*", async () => {
  throw new Error("Route Not Found");
});
app.use(errorHandler);

app.listen(() => {});

export { app };
