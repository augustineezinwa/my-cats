import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.test.json",
    },
  },
};

export default config;
