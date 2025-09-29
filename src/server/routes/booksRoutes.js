const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

// Book routes
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/with-libraries/all', BookController.getAllBooksWithLibraries);

module.exports = router;
