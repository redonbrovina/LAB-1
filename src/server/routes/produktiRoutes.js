// routes/produktiRoutes.js
const express = require("express");
const router = express.Router();
const ProduktiController = require("../controllers/ProduktiController");
const { authenticateToken } = require('../middleware/auth');

const controller = new ProduktiController();

router.use(authenticateToken);

router.get("/", controller.getAll.bind(controller));
router.get("/paginated", controller.getPaginated.bind(controller));
router.get("/search", controller.search.bind(controller));
router.get("/kategoria/:kategoriaID", controller.getByKategoria.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.get("/:id/variations", controller.getWithVariations.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.put("/:id/increase-stock", controller.increaseStock.bind(controller));
router.put("/:id/reduce-stock", controller.reduceStock.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

module.exports = router;
