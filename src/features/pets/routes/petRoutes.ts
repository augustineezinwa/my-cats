import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { authenticate } from "../../../common/middleware/auth";
import { asyncHandler } from "../../../common/utils/asyncHandler";

export const petRoutes = Router();
const controller = (globalThis as any & { petController: PetController }).petController || new PetController();
(globalThis as any & { petController: PetController }).petController = controller;

/**
 * @openapi
 * /api/v1/pets:
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
 * /api/v1/pets:
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
 * /api/v1/pets/{id}:
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


/**
 * @openapi
 * /api/v1/pets:
 *   get:
 *     tags: [Pets]
 *     summary: Get all pets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pets list
 */
petRoutes.get("/", authenticate, asyncHandler((req, res) => controller.getAll(req, res)));

/**
 * @openapi
 * /api/v1/pets/{id}:
 *   delete:
 *     tags: [Pets]
 *     summary: Delete a pet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet deleted
 */
petRoutes.delete("/:id", authenticate, asyncHandler((req, res) => controller.delete(req, res)));
