const request = require("supertest");
const app = require("../server");
const { HttpStatusCode } = require("axios");

describe("Add new message", () => {
  it("Check authenitcation of add new message end point", async () => {
    const res = await request(app)
      .post("/messages/messages")
      .set({ token: "In valid token", Accept: "application/json" })
      .send({
        message: "hi",
        sender: "5f38c4f9eb0ca06da4102b58de6a924e",
        encryptedMsg: "a533b2d31573847331ba2af55f7fe9c0",
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe("POST /messages/messages", () => {
  it("should create a msg", async () => {
    const res = await request(app).post("/messages/messages").send({
      message: "hi",
      sender: "5f38c4f9eb0ca06da4102b58de6a924e",
      encryptedMsg: "a533b2d31573847331ba2af55f7fe9c0",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.price).toBe(104);
  });
});
