import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";

export class BookServices {
  fileModule;

  constructor(fileModule) {
    this.fileModule = fileModule;
  }

  async getBooks() {
    try {
      const books = await this.fileModule.readFile(
        this.fileModule.getAbsoluteFilePath({
          dirname: __dirname,
          filePath: "/store",
          fileName: "books.json",
        })
      );
      console.log({ service: "service", books });
      return JSON.parse(books);
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
  async getBookById(bookId) {
    try {
      console.log({ bookId });
      const books = await this.fileModule.readFile(
        this.fileModule.getAbsoluteFilePath({
          dirname: __dirname,
          filePath: "/store",
          fileName: "books.json",
        })
      );
      const booksList = JSON.parse(books);
      return booksList.books.find((book) => book.id === +bookId);
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}

