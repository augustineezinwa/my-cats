import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("Auth endpoints", () => {
  it("signs up and returns token", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("test@example.com");
  });

  it("logs in with valid credentials", async () => {
    await request(app).post("/auth/signup").send({
      email: "login@example.com",
      password: "password123",
    });

    const response = await request(app).post("/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("returns current user", async () => {
    const signup = await request(app).post("/auth/signup").send({
      email: "me@example.com",
      password: "password123",
    });
    const token = signup.body.token;

    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("me@example.com");
  });
});
