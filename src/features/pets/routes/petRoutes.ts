import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { authenticate } from "../../../common/middleware/auth";
import { asyncHandler } from "../../../common/utils/asyncHandler";

export const petRoutes = Router();
const controller = (globalThis as any).petController || new PetController();
(globalThis as any).petController = controller;

/**
 * @openapi
 * /pets:
 *   post:
 *     tags: [Pets]
 *     summary: Create a pet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pet created
 */
petRoutes.post(
  "/",
  authenticate,
  asyncHandler((req, res) => controller.create(req, res))
);

/**
 * @openapi
 * /pets:
 *   put:
 *     tags: [Pets]
 *     summary: Update a pet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pet updated
 */
petRoutes.put(
  "/",
  authenticate,
  asyncHandler((req, res) => controller.update(req, res))
);

/**
 * @openapi
 * /pets/{id}:
 *   get:
 *     tags: [Pets]
 *     summary: Get pet by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet details
 */
petRoutes.get("/:id", asyncHandler((req, res) => controller.getById(req, res)));
