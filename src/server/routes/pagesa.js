const express = require('express');
const router = express.Router();

router.get('/pagesa', (req, res) => {
  res.json({ message: "Pagesa route works!" });
});

module.exports = router;
