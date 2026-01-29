import dotenv from "dotenv";
import { z } from "zod";

const nodeEnv = process.env.NODE_ENV ?? "development";
dotenv.config({ path: `.env.${nodeEnv}` });
dotenv.config({ path: ".env" });

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1),
  MONGO_DB_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse({
  NODE_ENV: nodeEnv,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
});
