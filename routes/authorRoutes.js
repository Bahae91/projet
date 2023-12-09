const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Author } = require('../models/authorModel');
const path = require('path');

// Lister tous les auteurs
router.get('/', async (req, res) => {
 try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Créer un nouvel auteur
router.post('/', [
 body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
 body('birthdate').isISO8601().withMessage('Invalid date format.'),
 body('nationality').isLength({ min: 1 }).trim().withMessage('Nationality must be specified.')
], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
 }

 try {
    const author = new Author({
      name: req.body.name,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality
    });

    const savedAuthor = await author.save();
    res.json(savedAuthor);
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Obtenir un auteur par ID
router.get('/:id', async (req, res) => {
 try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.send('Author not found');
    } else {
      res.json(author);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Mettre à jour un auteur
router.put('/:id', [
 body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
 body('birthdate').isISO8601().withMessage('Invalid date format.'),
 body('nationality').isLength({ min: 1 }).trim().withMessage('Nationality must be specified.')
], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
 }

 try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) {
      res.send('Author not found');
    } else {
      res.json(updatedAuthor);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

// Supprimer un auteur par ID
router.delete('/:id', async (req, res) => {
 try {
    const author = await Author.findByIdAndRemove(req.params.id);
    if (!author) {
      res.send('Author not found');
    } else {
      res.json(author);
    }
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
});

module.exports = router;