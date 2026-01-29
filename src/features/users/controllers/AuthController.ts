import type { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { loginSchema, signupSchema } from "../validations/authSchemas";

export class AuthController {
  private getService() {
    return new UserService();
  }

  async signup(req: Request, res: Response) {
    const payload = signupSchema.parse(req.body);
    console.log("signup", req.body, 'I got there, do you see it');
    const userService = this.getService();
    const user = await userService.createUser(
      payload.email,
      payload.password,
      payload.name
    );
    const token = userService.issueToken(user.id.toString());
    return res.status(201).json({
      token,
      user: { id: user.id.toString(), email: user.email, name: user.name },
    });
  }

  async login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const userService = this.getService();
    const user = await userService.validateUser(
      payload.email,
      payload.password
    );
    const token = userService.issueToken(user.id.toString());
    return res.json({
      token,
      user: { id: user.id.toString(), email: user.email, name: user.name },
    });
  }

  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userService = this.getService();
    const user = await userService.getUserById(req.user.id);
    return res.json({
      user: { id: user.id.toString(), email: user.email, name: user.name },
    });
  }
}
