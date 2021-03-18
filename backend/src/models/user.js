import mongoose from "mongoose";
import { Password } from "../utils/password";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // doc is user document
      // ret is the thing turned into json
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// use function instead of arrow func as it gives us access to the user document
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // we will get the users password off the document that is about to be saved and pass it to our hash method
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  //we must call this at the end as mongoose struggles to understand async calls
  done();
});

// this allows us to attach the build function to our userSchema
userSchema.statics.build = (attrs) => {
  return new User(attrs);
};

Password;

// we are passing in the new interface we have created,
// we are letting mongo know that the User model will have a function called build
const User = mongoose.model("User", userSchema);

export { User };
