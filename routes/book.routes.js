const express = require("express");
const router = express.Router();

/*Model*/
const Book = require("../models/Book.model.js");
const Author = require("../models/Author.model.js");

/* GET /books page */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate('author')

    res.render("book/list.hbs", {
      books: books,
    });
  } catch (err) {
    next(err);
  }
});

/* GET /books details */
router.get("/:bookId/details", async (req, res, next) => {
  try {
    const book = await Book.find({ _id: req.params.bookId }).populate('author')
    res.render("book/details.hbs", {
      book: book[0],
    });
  } catch (err) {
    next(err);
  }
});

/* GET "/books/add" */
router.get("/add", async (req, res, next) => {

  try {

    const data = await Author.find()
    //busca los autores de la base de datso y los pasa al cliente
    res.render("book/add.hbs", {
      authors: data
    });

  } catch (err) {
    next(err)
  }
});

/* POST "/books/add-new-book" o "/books/add" */
router.post("/add", async (req, res, next) => {
  try {
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      description: req.body.description,
    });

    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/* GET "/books/edit" */
router.get("/:bookId/edit", async (req, res, next) => {
  try {
    const data = await Book.find({ _id: req.params.bookId });
    res.render("book/edit.hbs", {
      book: data[0],
    });
  } catch (err) {
    next(err);
  }
});

/* POST "/books/edit" o "/books/edit" */
router.post("/:bookId/edit", async (req, res, next) => {
  try {
    const { title, author, image, description } = req.body;
    const bookId = req.params.bookId;
    await Book.findByIdAndUpdate(bookId, {
      title: title,
      author: author,
      image: image,
      description: description,
    });

    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

//POST "book/:bookId/delete"
router.post("/:bookId/delete", async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
