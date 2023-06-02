import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import httpStatus from "http-status";

import { ApiError } from "./utils/apiError.js";
import bookRoutes from "./routers/index.js";
import config from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// v1 api routes
app.use("/api/v1", bookRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
});

export default app;

