import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("Pet endpoints", () => {
  const signupAndLogin = async () => {
    const signup = await request(app).post("/auth/signup").send({
      email: "petowner@example.com",
      password: "password123",
    });
    return signup.body.token as string;
  };

  it("creates, updates, and fetches a pet", async () => {
    const token = await signupAndLogin();

    const createResponse = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Luna", type: "cat", age: 2 });

    expect(createResponse.status).toBe(201);
    const petId = createResponse.body.id;

    const updateResponse = await request(app)
      .put("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: petId, name: "Luna Updated" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Luna Updated");

    const getResponse = await request(app).get(`/pets/${petId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Luna Updated");
  });
});
