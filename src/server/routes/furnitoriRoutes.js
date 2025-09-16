const express = require("express");
const router = express.Router();
const FurnitoriController = require("../controllers/FurnitoriController");

router.get("/", FurnitoriController.getAll);
router.get("/:id", FurnitoriController.getById);
router.post("/", FurnitoriController.create);
router.put("/:id", FurnitoriController.update);
router.delete("/:id", FurnitoriController.delete);

module.exports = router;