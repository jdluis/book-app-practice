/* const { Schema, model } = require("mongoose"); */
const mongoose = require("mongoose");

//Schema creation
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
        type: String,
        require: true,
      },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Author",
        require: true,
      },
    image: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//Model creation
//la anotacion tradicional es sin poner el Model, es decir como esta y no BookModel
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
