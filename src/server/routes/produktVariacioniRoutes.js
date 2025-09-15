const express = require("express");
const router = express.Router();
const ProduktVariacioniController = require("../controllers/ProduktVariacioniController");

router.get("/", ProduktVariacioniController.getAll);
router.get("/:id", ProduktVariacioniController.getById);
router.post("/", ProduktVariacioniController.create);
router.put("/:id", ProduktVariacioniController.update);
router.delete("/:id", ProduktVariacioniController.delete);

module.exports = router;
