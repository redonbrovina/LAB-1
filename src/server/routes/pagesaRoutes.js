const express = require("express");
const router = express.Router();
const PagesaController = require("../controllers/PagesaController");
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get("/", PagesaController.getAll);
router.get("/paginated", PagesaController.getPaginated);
router.get("/:id", PagesaController.getById);
router.get("/porosia/:porosiaID", PagesaController.getByPorosia);
router.get("/klienti/:klientiID", PagesaController.getByKlientiID);
router.get("/klienti/:klientiID/this-month", PagesaController.getThisMonthByKlientiID);
router.post("/", PagesaController.create);
router.put("/:id", PagesaController.update);
router.delete("/:id", PagesaController.delete);

module.exports = router;