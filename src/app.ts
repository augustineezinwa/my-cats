import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { authRoutes } from "./features/users/routes/authRoutes";
import { petRoutes } from "./features/pets/routes/petRoutes";
import { errorHandler } from "./common/middleware/errorHandler";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/pets", petRoutes);

  app.use(errorHandler);
  return app;
};
