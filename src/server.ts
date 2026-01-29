import { createApp } from "./app";
import { env } from "./config/env";
import { initDataSource } from "./config/data-source";

const start = async () => {
  await initDataSource();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
