const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');

router.post('/', OwnerController.createOwner);
router.get('/', OwnerController.getAllOwners);
router.get('/:id', OwnerController.getOwnerById);
router.put('/:id', OwnerController.updateOwner);
router.delete('/:id', OwnerController.deleteOwner);

module.exports = router;
