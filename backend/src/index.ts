import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import Queue from "bull";

const start = async () => {
  dotenv.config();

  // const queue =  new Queue()

  if (process.env.NODE_ENV === "development") {
  }

  // make sure our env variables are defined before we even start the app
  console.log("starting up......");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not defined");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  if (!process.env.MONGO_URI_DEV) {
    throw new Error("MONGO_URI_DEV is not defined");
  }

  if (!process.env.CLIENT_SIGNINURL_DEV) {
    throw new Error("CLIENT_SIGNINURL_DEV is not defined");
  }

  // we putting in the name of the cluster service IP so we can access our mongo database on K8
  // we then pass in the port that our DB is running on
  // lasty we can pass in a name of the database we want to connect to
  // if there is no db with such name, mongo will create it
  try {
    await mongoose.connect(process.env.MONGO_URI_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error Connecting to db", err);
  }
  // after we have connected to the db, we can listen for requests
  app.listen(4000, () => {
    console.log("Listening on 4000");
  });
};

start();
