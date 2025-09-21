const express = require("express");
const router = express.Router();
const ProduktVariacioniController = require("../controllers/ProduktVariacioniController");
const { authenticateToken } = require('../middleware/auth');

const controller = new ProduktVariacioniController();

router.use(authenticateToken);

router.get("/", controller.getAll.bind(controller));
router.get("/te-plota", controller.getVariacioneTePlota.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

module.exports = router;
