export class BookControllers {
  bookService;

  constructor(bookService) {
    this.bookService = bookService;
  }

  getBooks = async (_req, res, next) => {
    try {
      const books = await this.bookService.getBooks();
      console.log({ books });
      res.status(200).json({ status: "success", data: books });
    } catch (error) {
      next(error);
    }
  };

  getBook = async (req, res, next) => {
    const { id } = req.params;
    console.log({ id });
    try {
      const book = await this.bookService.getBookById(id);
      res.status(200).json({ status: "success", book });
    } catch (error) {
      next(error);
    }
  };

  addNewBook() {
    console.log("AddNewBook");
    res.status(200).json({});
  }
}

