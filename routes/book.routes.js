const express = require("express");
const router = express.Router();

/*Model*/
const Book = require("../models/Book.model.js");

/* GET /books page */
router.get("/", async (req, res, next) => {
  try {
    //al hacer el find ya crea la bas ede datos en mongo
    const data = await Book.find();
    res.render("book/list.hbs", {
      books: data,
    });
  } catch (err) {
    next(err);
  }
});

/* GET /books details */
router.get("/:bookId/details", async (req, res, next) => {
  try {
    const data = await Book.find({ _id: req.params.bookId });
    res.render("book/details.hbs", {
      book: data[0],
    });
  } catch (err) {
    next(err);
  }
});

/* GET "/books/add" */
router.get("/add", (req, res, next) => {
  res.render("book/add.hbs");
});

/* POST "/books/add-new-book" o "/books/add" */
router.post("/add", async (req, res, next) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      description: req.body.description,
    });
    /*     res.render("book/add-new-book.hbs", {
        book: book
    }); */

    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/* GET "/books/edit" */
router.get("/:bookId/edit", async (req, res, next) => {
  try {
    const data = await Book.find({ _id: req.params.bookId });
    console.log(data)
    res.render("book/edit.hbs", {
        book: data[0]
    });
  } catch (err) {
    next(err)
  }
});

/* POST "/books/edit" o "/books/edit" */
router.post("/:bookId/edit", async (req, res, next) => {
  try {
    const {title, author, image, description } = req.body;
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId, {
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

module.exports = router;
