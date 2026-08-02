import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";


import env from "./config/env.js";

import routes from "./routes/index.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntegrityCheck API is running.",
  });
});


app.use("/api/v1/users", userRoutes);

app.use("/api/v1", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);
export default app;