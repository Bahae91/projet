const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

// Afficher tous les livres
router.get('/', async (req, res) => {
 try {
    const books = await Book.find({});
    res.render('book_list', { title: 'Book List', books });
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Afficher les détails d'un livre
router.get('/:id', async (req, res) => {
 try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.send('Book not found');
    } else {
      res.render('book_detail', { title: 'Book Detail', book });
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Ajouter un nouveau livre
router.post('/', async (req, res) => {
 try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect('/books');
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Mettre à jour un livre existant
router.put('/:id', async (req, res) => {
 try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      res.send('Book not found');
    } else {
      res.json(updatedBook);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Supprimer un livre
router.delete('/:id', async (req, res) => {
 try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.send('Book not found');
    } else {
      res.json(deletedBook);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

module.exports = router;