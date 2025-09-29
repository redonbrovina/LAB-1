const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/StoreController');

// Store routes
router.get('/', StoreController.getAllStores);
router.get('/:id', StoreController.getStoreById);
router.post('/', StoreController.createStore);
router.put('/:id', StoreController.updateStore);
router.delete('/:id', StoreController.deleteStore);
router.get('/:id/products', StoreController.getStoreWithProducts);

module.exports = router;
