/* const { Schema, model } = require("mongoose"); */
const mongoose = require("mongoose")

//Schema creation
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    image: String,
})

//Model creation
//la anotacion tradicional es sin poner el Model, es decir como esta y no BookModel
const Book = mongoose.model("Book", bookSchema)

module.exports = Book;