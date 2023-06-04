import httpStatus from "http-status";

export class BookControllers {
  bookService;

  constructor(bookService) {
    this.bookService = bookService;
  }

  getBooks = async (_req, res, next) => {
    try {
      const books = await this.bookService.getBooks();
      console.log({ books });
      res.status(httpStatus.OK).render("books", { books });
      // res.status(httpStatus.OK).json({ status: httpStatus[200], data: books });
    } catch (error) {
      next(error);
    }
  };

  getBook = async (req, res, next) => {
    const { id } = req.params;
    console.log({ id });
    try {
      const book = await this.bookService.getBookById(id);
      console.log({ book });
      res.status(httpStatus.OK).render("book", { book });
      // res.status(httpStatus.OK).json({ status: httpStatus["200"], book });
    } catch (error) {
      next(error);
    }
  };

  addNewBook = async (req, res, next) => {
    const { id, name } = req.body;
    console.log({ id, title });
    try {
      const books = await this.bookService.getBooks();

      let isTheBookExist = books.find((book) => book.id === parseInt(id));
      console.log({ isTheBookExist, id: parseInt(id) });
      if (isTheBookExist) {
        const newError = new Error("The book aleady added.");
        newError.statusCode = 409;
        throw newError;
      }
      books.push({ id: +id, title });
      books.map(console.log);
      this.bookService.addNewBookToFile(JSON.stringify(books));
      res
        .status(httpStatus.CREATED)
        .json({ status: "success", message: "Book added successfully!" });
    } catch (error) {
      next(error);
    }
  };
}

