import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../src/features/users/models/User";
import { Pet } from "../src/features/pets/models/Pet";

let mongoServer: MongoMemoryServer;
let dataSourceUtils: typeof import("../src/config/data-source");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test_secret_change_me";

  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.MONGO_DB_NAME = "pets_test";

  dataSourceUtils = await import("../src/config/data-source");
  await dataSourceUtils.initDataSource();
});

afterEach(async () => {
  const dataSource = dataSourceUtils.getDataSource();
  await dataSource.getMongoRepository<User>(User).deleteMany({});
  await dataSource.getMongoRepository<Pet>(Pet).deleteMany({});
});

afterAll(async () => {
  await dataSourceUtils.destroyDataSource();
  await mongoServer.stop();
});
