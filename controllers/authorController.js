const Author = require('../models/authorModel');

// Liste des auteurs
exports.author_list = async (req, res) => {
 try {
    const authors = await Author.find();
    res.render('author_list', { title: 'Author List', authors });
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
};

// Formulaire d'ajout d'auteur
exports.author_create_get = (req, res) => {
 res.render('author_add', { title: 'Add New Author' });
};

// Ajout d'auteur
exports.author_create_post = async (req, res) => {
 try {
    const author = new Author(req.body);
    await author.save();
    res.redirect('/authors');
 } catch (err) {
    console.error(err);
    res.send('Error');
 }
};

// Détails d'auteur
exports.author_detail = async (req, res) => {
    try {
       const author = await Author.findById(req.params.id);
       if (!author) {
          res.send('Author not found');
       } else {
          res.render('author_detail', { title: 'Author Detail', author });
       }
    } catch (err) {
       console.error(err);
       res.send('Error');
    }
   };

   // Supprimer un auteur
router.delete('/:id', async (req, res) => {
    try {
       const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
       if (!deletedAuthor) {
         res.send('Author not found');
       } else {
         res.json(deletedAuthor);
       }
    } catch (err) {
       console.error(err);
       res.send('Error');
    }
   });

   // Mettre à jour un auteur
router.put('/:id', async (req, res) => {
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