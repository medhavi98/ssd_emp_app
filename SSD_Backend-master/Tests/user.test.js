const request = require("supertest");
const app = require("../server");
const { HttpStatusCode } = require("axios");

describe("Add new user", () => {
  it("Check authenitcation of add new user end point", async () => {
    const res = await request(app)
      .post("/users/create")
      .set({ token: "In valid token", Accept: "application/json" })
      .send({
        username: "abc",
        password: "abc",
        role: "Admin",
      });
    expect(res.statusCode).toEqual(401);
  });
});

// describe("POST /users/create", () => {
//   it("should create a user", async () => {
//     const res = await request(app)
//       .post("/users/create")
//       .set({
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9uIjpbIjAyIiwiMDMiXSwicm9sZSI6Ik1hbmFnZXIiLCJpZCI6IjYzNzViZjIyZmM0MDNkN2NjNDdkOTQxYyIsImlhdCI6MTY2ODY3MzM3MiwiZXhwIjoxNjcxMjY1MzcyfQ.Vo8Iq38xT1QrsUb0eq2vIjVm_emqHj5IEmJR8P2Xq8c",
//         Accept: "application/json",
//       })
//       .send({
//         username: "abc",
//         password: "abc",
//         role: "Admin",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
