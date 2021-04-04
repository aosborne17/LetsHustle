import sgMail from "@sendgrid/mail";
import { BadRequestError } from "../../errors/bad-request-error";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMailToUser(userEmail, subject = "Your Task", text) {
  const msg = {
    from: "aosborne99@outlook.com",
    to: userEmail,
    subject,
    text,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Message Sent");
    })
    .catch((err) => {
      console.log(err);
      throw new BadRequestError("Error Sending Verification Message to User");
    });
}

export { sendMailToUser };
