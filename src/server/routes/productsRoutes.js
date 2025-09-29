const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Product routes
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/with-stores/all', ProductController.getAllProductsWithStores);

module.exports = router;
