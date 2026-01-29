import { ObjectId } from "mongodb";
import { getDataSource } from "../../../config/data-source";
import { HttpError } from "../../../common/errors/HttpError";
import { Pet } from "../models/Pet";

export class PetService {
  private getRepo() {
    return getDataSource().getMongoRepository(Pet);
  }

  async createPet(input: {
    name: string;
    type: string;
    age?: number;
    ownerId: string;
  }) {
    const repo = this.getRepo();
    const pet = repo.create({
      name: input.name,
      type: input.type,
      age: input.age,
      ownerId: new ObjectId(input.ownerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await repo.save(pet);
    return pet;
  }

  async updatePet(input: {
    id: string;
    ownerId: string;
    name?: string;
    type?: string;
    age?: number;
  }) {
    if (!ObjectId.isValid(input.id)) {
      throw new HttpError(400, "Invalid pet id");
    }
    const repo = this.getRepo();
    const pet = await repo.findOneById(new ObjectId(input.id));
    if (!pet) {
      throw new HttpError(404, "Pet not found");
    }
    if (pet.ownerId.toString() !== input.ownerId) {
      throw new HttpError(403, "Forbidden");
    }

    const updated = {
      ...pet,
      name: input.name ?? pet.name,
      type: input.type ?? pet.type,
      age: input.age ?? pet.age,
      updatedAt: new Date(),
    };
    await repo.save(updated);
    return updated;
  }

  async getPetById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new HttpError(400, "Invalid pet id");
    }
    const repo = this.getRepo();
    const pet = await repo.findOneBy(new ObjectId(id));

    if (!pet) {
      throw new HttpError(404, "Pet not found");
    }
    return pet;
  }

  async getAllPets(ownerId: string) {
    const repo = this.getRepo();
    return repo.find({
      where: {
        ownerId: new ObjectId(ownerId),
      },
    })
  }

  async deletePet(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new HttpError(400, "Invalid pet id");
    }
    const repo = this.getRepo();
    const pet = await repo.findOneById(new ObjectId(id));
    if (!pet) {
      throw new HttpError(404, "Pet not found");
    }
    await repo.remove(pet);
  }
}
