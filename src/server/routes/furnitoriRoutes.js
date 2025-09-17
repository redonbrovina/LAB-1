const express = require("express");
const router = express.Router();
const FurnitoriController = require("../controllers/FurnitoriController");

const controller = new FurnitoriController();

router.get("/", controller.getAll.bind(controller));
router.get("/shteti/:shtetiID", controller.getByShteti.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

module.exports = router;