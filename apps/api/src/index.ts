import dotenv from "dotenv";

import { config } from "@/config/config";

import { createServer } from "./server";
import { logger } from "./common/logger";

dotenv.config();

const port = config.port || 3001;
const server = createServer();

server.listen(port, () => {
  logger.info(`api running on ${port}`);
});
