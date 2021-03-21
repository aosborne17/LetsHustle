import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"), // so if there is an error with email, we will send error msg
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({
      email,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
      password,
    });

    ///

    const msg = {
      from: "aosborne99@outlook.com",
      to: user.email,
      subject: "Email Verification",
      text: `
        Hello, thanks for registering on Let's Hustle.
        Please copy and paste the address below to verify your account.
        http://${req.headers.host}/verify-email?token=${user.emailToken}
      `,
      html: `
      <h1>Hello</h1>
      <p>Hello, thanks for registering on Let's Hustle.</p>
      <p>Please copy and paste the address below to verify your account.</p>
      <a href="http://${req.headers.host}/api/users/verify-email?token=${user.emailToken}">Verify your account </a>
      `,
    };

    console.log(msg);

    sgMail
      .send(msg)
      .then(() => {
        console.log("Message Sent");
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestError("Error Sending Verification Message to User");
      });

    await user.save(); // persist to mongoDB

    // NOT SURE WHETHER TO SIGN THEM IN BUT REMIND THEM TO VERIFIY THEIR ACCOUNT, OR DON'T SIGN THEM IN UNLESS VERIFIED

    // // generate jwt
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   process.env.JWT_KEY!
    // );

    // // store jwt on session object
    // req.session = {
    //   jwt: userJwt,
    // };

    return res.status(201).send(user);
  }
);

export { router as signUpRouter };
