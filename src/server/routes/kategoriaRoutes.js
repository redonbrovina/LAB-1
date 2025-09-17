const express = require("express");
const router = express.Router();
const KategoriaController = require("../controllers/KategoriaController");

router.get("/", KategoriaController.getAll);
router.get("/:id", KategoriaController.getById);
router.post("/", KategoriaController.create);
router.put("/:id", KategoriaController.update);
router.delete("/:id", KategoriaController.delete);

module.exports = router;


