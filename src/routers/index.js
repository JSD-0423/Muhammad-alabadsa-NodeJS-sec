import { Router } from "express";
import fs from "fs/promises";
import path from "path";

import { BookControllers } from "../controllers/index.js";
import { BookServices } from "../services/index.js";
import { FileUtils } from "../utils/files.js";
import BooksRoute from "./books.route.js";

const router = Router();
const fileUtils = new FileUtils(fs, path);
const bookServices = new BookServices(fileUtils);
const bookControllers = new BookControllers(bookServices);

const booksRoute = new BooksRoute(bookControllers);

router.use("/books", booksRoute.router);

export default router;

