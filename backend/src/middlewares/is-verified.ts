import { Request, Response, NextFunction } from "express";
// import { NotAuthorizedError } from "../errors/not-authorized-error";

// this function runs to ensure that all our users are verified
export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.currentUser);

  // so if they do have a currentUser then we'll allow them through
  next();
};
