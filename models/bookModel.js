const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
 title: String,
 author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
 genre: String,
 year: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;