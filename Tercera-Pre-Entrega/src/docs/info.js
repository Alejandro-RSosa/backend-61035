export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation for the Backend Course API",
    },
    servers: [
      {
        url: "http://backend.elchuleta.work",
      },
    ],
  },
  apis: ["src/docs/*.yml"],
};
