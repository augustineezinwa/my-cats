import type { Request, Response } from "express";
import { createPetSchema, updatePetSchema } from "../validations/petSchemas";
import { PetService } from "../services/PetService";

export class PetController {
  private getService() {
    const service = (globalThis as any & { petService: PetService }).petService || new PetService();
    (globalThis as any & { petService: PetService }).petService = service;
    return service;
  }

  async create(req: Request, res: Response) {
    const payload = createPetSchema.parse(req.body);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const petService = this.getService();
    const pet = await petService.createPet({
      ...payload,
      ownerId: req.user.id,
    });
    return res.status(201).json({
      id: pet.id,
      name: pet.name,
      type: pet.type,
      age: pet.age,
      ownerId: pet.ownerId,
    });
  }

  async update(req: Request, res: Response) {
    const payload = updatePetSchema.parse(req.body);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const petService = this.getService();
    const pet = await petService.updatePet({
      ...payload,
      ownerId: req.user.id,
    });
    return res.json({
      id: pet.id,
      name: pet.name,
      type: pet.type,
      age: pet.age,
      ownerId: pet.ownerId,
    });
  }

  async getById(req: Request, res: Response) {
    const petService = this.getService();
    const pet = await petService.getPetById(String(req.params.id));
    return res.json({
      id: pet.id,
      name: pet.name,
      type: pet.type,
      age: pet.age,
      ownerId: pet.ownerId,
    });
  }

  async getAll(req: Request, res: Response) {
    const petService = this.getService();
    const pets = await petService.getAllPets(req.user!.id);
    return res.json(pets);
  }

  async delete(req: Request, res: Response) {
    const petService = this.getService();
    await petService.deletePet(String(req.params.id));
    return res.json({ message: "Pet deleted successfully" });
  }
}
