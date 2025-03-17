import { config } from "@/config/config";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ObvioAPI Documentation",
    version: "0.0.1",
    description: "API Documentation for Obvio",
    license: {
      name: "MIT",
      url: "https://github.com/obvio/obvio.git",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: "Development Server",
    },
  ],
};
