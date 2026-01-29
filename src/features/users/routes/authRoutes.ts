import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../../../common/middleware/auth";
import { asyncHandler } from "../../../common/utils/asyncHandler";

export const authRoutes = Router();
const controller = new AuthController();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
authRoutes.post(
  "/signup",
  asyncHandler((req, res) => controller.signup(req, res))
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
authRoutes.post(
  "/login",
  asyncHandler((req, res) => controller.login(req, res))
);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 */
authRoutes.get(
  "/me",
  authenticate,
  asyncHandler((req, res) => controller.me(req, res))
);
