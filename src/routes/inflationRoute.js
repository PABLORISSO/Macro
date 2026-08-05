const express = require("express");
const router = express.Router();
const { getInflacion } = require("../controllers/inflationController");

router.get("/", getInflacion);

module.exports = router;