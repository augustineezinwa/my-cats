import "reflect-metadata";
import { DataSource } from "typeorm";
import type { MongoMemoryServer } from "mongodb-memory-server";
import { env } from "./env";
import { User } from "../features/users/models/User";
import { Pet } from "../features/pets/models/Pet";

let dataSource: DataSource | null = null;
let memoryServer: MongoMemoryServer | null = null;

const resolveMongoUri = async () => {
  if (env.MONGO_URI) {
    return env.MONGO_URI;
  }

  if (!env.USE_IN_MEMORY_DB) {
    throw new Error("MONGO_URI is required when USE_IN_MEMORY_DB is false.");
  }

  if (!memoryServer) {
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    memoryServer = await MongoMemoryServer.create();
  }
  return memoryServer.getUri();
};

export const initDataSource = async () => {
  if (!dataSource) {
    const url = await resolveMongoUri();
    dataSource = new DataSource({
      type: "mongodb",
      url,
      database: env.MONGO_DB_NAME,
      synchronize: true,
      entities: [User, Pet],
    });
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
};

export const getDataSource = () => {
  if (!dataSource) {
    throw new Error("DataSource not initialized. Call initDataSource first.");
  }
  return dataSource;
};

export const destroyDataSource = async () => {
  if (dataSource?.isInitialized) {
    await dataSource.destroy();
  }
  if (memoryServer) {
    await memoryServer.stop();
  }
  dataSource = null;
  memoryServer = null;
};
