const express = require('express');
const router = express.Router();
const ProduktiPorosiseController = require('../controllers/ProduktiPorosiseController');
const produktiPorosiseController = new ProduktiPorosiseController();

router.get('/', produktiPorosiseController.getAll.bind(produktiPorosiseController));
router.get('/:id', produktiPorosiseController.getById.bind(produktiPorosiseController));
router.post('/', produktiPorosiseController.create.bind(produktiPorosiseController));
router.put('/:id', produktiPorosiseController.update.bind(produktiPorosiseController));
router.delete('/:id', produktiPorosiseController.delete.bind(produktiPorosiseController));

module.exports = router;
