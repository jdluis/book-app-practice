const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Books Routes */

const bookRoutes = require("./book.routes.js")
router.use("/books", bookRoutes);

//EXPORT
module.exports = router;
