const express = require("express");
const router = express.Router();
const PagesaController = require("../controllers/PagesaController");

router.get("/", PagesaController.getAll);
router.get("/:id", PagesaController.getById);
router.post("/", PagesaController.create);
router.put("/:id", PagesaController.update);
router.delete("/:id", PagesaController.delete);

module.exports = router;