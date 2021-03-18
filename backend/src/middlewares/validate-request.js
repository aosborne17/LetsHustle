import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  // so if there errors is noy empty, meaning there is an error
  // then we will need to handle them accordingly
  if (!errors.isEmpty()) {
    // we can send these errors back to user
    // we will return the errors in an array format
    // throw new Error('Invalid email or password');
    throw new RequestValidationError(errors.array());
  }

  next();
};
