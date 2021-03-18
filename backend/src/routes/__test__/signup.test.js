import request from "supertest";
import { app } from "../../app.js";

it("returns a 201 on successful signup", async () => {
  return (
    request(app) // passing in our app to run
      .post("/api/users/signup") // the route and method to test
      // specifiy body info
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201)
  );
});
