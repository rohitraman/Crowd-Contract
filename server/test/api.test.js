const request = require("supertest");
const app = require("../index");

let jwtToken; // Variable to store the JWT token

describe("API Test Suite", () => {
  beforeAll(async () => {
    // Perform login API request and obtain the JWT token
    const loginData = {
      name: "Prathviraj B N",
      password: "1234",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);
    jwtToken = response.body.jwt;
    expect(response.status).toBe(200);
    expect(jwtToken).toBeDefined();
  }, 70000);

  test("Another API Using JWT Token", async () => {
    const reqData = {
      "userName" : "Prathviraj B N"
    }
    const response = await request(app)
      .post("/api/users/getUser")
      .send(reqData)
      .set("Authorization", `Bearer ${jwtToken}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Prathviraj B N");
  }, 70000);
});
