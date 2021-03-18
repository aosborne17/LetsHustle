import jwt from "jsonwebtoken";
import express from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be betwee 4 and 20 characters"), // so if there is an error with email, we will send error msg
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Email Already in use");
    }
    const user = User.build({
      email,
      password,
    });
    await user.save(); // persist to mongoDB

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    // store jwt on session object
    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  }
);

export { router as signUpRouter };
