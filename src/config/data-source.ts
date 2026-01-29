import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../features/users/models/User";
import { Pet } from "../features/pets/models/Pet";

let dataSource: DataSource | null = null;

export const getDataSource = () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "mongodb",
      url: env.MONGO_URI,
      database: env.MONGO_DB_NAME,
      synchronize: true,
      entities: [User, Pet],
    });
  }
  return dataSource;
};

export const initDataSource = async () => {
  const source = getDataSource();
  if (!source.isInitialized) {
    await source.initialize();
  }
  return source;
};

export const destroyDataSource = async () => {
  if (dataSource?.isInitialized) {
    await dataSource.destroy();
  }
  dataSource = null;
};
