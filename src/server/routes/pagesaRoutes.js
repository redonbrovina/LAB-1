console.log("✅ pagesaRoutes file reached");

const express = require("express");
const router = express.Router();
const PagesaController = require("../controllers/PagesaController");

router.get("/", (req, res) => {
  res.send("Pagesa GET works ✅");
});

router.post("/", PagesaController.create);
router.get("/:id", PagesaController.getById);
router.put("/:id", PagesaController.update);
router.delete("/:id", PagesaController.delete);

module.exports = router;
