const express = require("express");
const router = express.Router();

/*Model*/
const Book = require("../models/Book.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET Books page */
router.get("/books", async (req, res, next) => {
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

/* GET Books details */
router.get("/books/:bookId/details", async (req, res, next) => {
  try {
    console.log(req.params.bookId);
    const data = await Book.find({_id : req.params.bookId});
    console.log(data)
    res.render("book/details.hbs", {
      book: data[0]
    });
  } catch (err) {
    next(err);
  }
});

//EXPORT
module.exports = router;
