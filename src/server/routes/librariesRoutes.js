const express = require('express');
const router = express.Router();
const LibraryController = require('../controllers/LibraryController');

// Library routes
router.get('/', LibraryController.getAllLibraries);
router.get('/:id', LibraryController.getLibraryById);
router.post('/', LibraryController.createLibrary);
router.put('/:id', LibraryController.updateLibrary);
router.delete('/:id', LibraryController.deleteLibrary);
router.get('/:id/books', LibraryController.getLibraryWithBooks);

module.exports = router;
