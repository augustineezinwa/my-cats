import type { Request, Response } from "express";
import { createPetSchema, updatePetSchema } from "../validations/petSchemas";
import { PetService } from "../services/PetService";

export class PetController {
  private getService() {
    return new PetService();
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
      pet: {
        id: pet.id.toString(),
        name: pet.name,
        type: pet.type,
        age: pet.age,
        ownerId: pet.ownerId.toString(),
      },
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
      pet: {
        id: pet.id.toString(),
        name: pet.name,
        type: pet.type,
        age: pet.age,
        ownerId: pet.ownerId.toString(),
      },
    });
  }

  async getById(req: Request, res: Response) {
    const petService = this.getService();
    const pet = await petService.getPetById(req.params.id);
    return res.json({
      pet: {
        id: pet.id.toString(),
        name: pet.name,
        type: pet.type,
        age: pet.age,
        ownerId: pet.ownerId.toString(),
      },
    });
  }
}
