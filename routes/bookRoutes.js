const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Book } = require('../models/bookModel');
const path = require('path');

// Lister tous les livres
router.get('/', async (req, res) => {
 try {
    const books = await Book.find().sort({ title: 1 });
    res.json(books);
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Créer un nouveau livre
router.post('/', [
 body('title').isLength({ min: 1 }).trim().withMessage('Title must be specified.'),
 body('description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
 body('publicationDate').isISO8601().withMessage('Invalid date format.'),
 body('authorId').isLength({ min: 1 }).trim().withMessage('Author ID must be specified.')
], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
 }

 try {
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      publicationDate: req.body.publicationDate,
      authorId: req.body.authorId
    });

    const savedBook = await book.save();
    res.json(savedBook);
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Obtenir un livre par ID
router.get('/:id', async (req, res) => {
 try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.send('Book not found');
    } else {
      res.json(book);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Mettre à jour un livre
router.put('/:id', [
 body('title').isLength({ min: 1 }).trim().withMessage('Title must be specified.'),
 body('description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
 body('publicationDate').isISO8601().withMessage('Invalid date format.'),
 body('authorId').isLength({ min: 1 }).trim().withMessage('Author ID must be specified.')
], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
 }

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

// Supprimer un livre par ID
router.delete('/:id', async (req, res) => {
 try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      res.send('Book not found');
    } else {
      res.json(book);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

module.exports = router;