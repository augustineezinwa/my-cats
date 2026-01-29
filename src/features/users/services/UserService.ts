import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDataSource } from "../../../config/data-source";
import { env } from "../../../config/env";
import { HttpError } from "../../../common/errors/HttpError";
import { User } from "../models/User";

export class UserService {
  private repo = getDataSource().getMongoRepository(User);

  async createUser(email: string, password: string, name?: string) {
    const existing = await this.repo.findOneBy({ email });
    if (existing) {
      throw new HttpError(409, "Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({
      email,
      passwordHash,
      name,
      createdAt: new Date(),
    });
    await this.repo.save(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new HttpError(401, "Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new HttpError(401, "Invalid credentials");
    }

    return user;
  }

  async getUserById(id: string) {
    const user = await this.repo.findOneBy({ id: new ObjectId(id) });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    return user;
  }

  issueToken(userId: string) {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "1h" });
  }
}
