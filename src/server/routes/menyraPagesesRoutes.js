const express = require('express');
const router = express.Router();
const MenyraPagesesController = require('../controllers/MenyraPagesesController');

router.get('/', MenyraPagesesController.getAll);
router.get('/:id', MenyraPagesesController.getById);
router.post('/', MenyraPagesesController.create);
router.put('/:id', MenyraPagesesController.update);
router.delete('/:id', MenyraPagesesController.delete);
router.delete('/', MenyraPagesesController.deleteAll);

module.exports = router;