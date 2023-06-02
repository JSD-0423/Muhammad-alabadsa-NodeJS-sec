import { Router } from "express";

class BooksRoute {
  path = "/";
  router = Router();
  bookControllers;

  constructor(bookControllers) {
    this.bookControllers = bookControllers;
    this.initializeRoutes();
  }

  initializeRoutes() {
    console.log({ bookControllers: this.bookControllers });
    this.router.get(`${this.path}`, this.bookControllers.getBooks);
    this.router.get(`${this.path}:id`, this.bookControllers.getBook);
    this.router.post(`${this.path}:id`, this.bookControllers.addNewBook);
  }
}

export default BooksRoute;

