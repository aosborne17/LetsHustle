import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";

// sgMail.setApiKey();

const router = express.Router();

router.get(
  "/api/users/verify-email",

  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.query.token);
    console.log("hitt verify");

    const user = await User.findOne({ emailToken: req.query.token });

    if (!user) {
      throw new BadRequestError("Invalid Token");
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save(); // persist to mongoDB

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store jwt on session object
    req.session = {
      jwt: userJwt,
    };

    return res.status(200).redirect(process.env.CLIENT_SIGNINURL_DEV!);
  }
);

export { router as emailVerificationRouter };
