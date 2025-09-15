// routes/produktiRoutes.js
const express = require("express");
const router = express.Router();
const ProduktiController = require("../controllers/ProduktiController");

router.get("/", ProduktiController.getAll);
router.get("/:id", ProduktiController.getById);
router.post("/", ProduktiController.create);
router.put("/:id", ProduktiController.update);
router.delete("/:id", ProduktiController.delete);

module.exports = router;
