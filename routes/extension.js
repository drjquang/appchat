var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/chart", function (req, res, next) {
  res.render("chart", { title: "Chart" });
});

router.get("/history", function (req, res, next) {
  res.render("history", { title: "History" });
});

module.exports = router;
