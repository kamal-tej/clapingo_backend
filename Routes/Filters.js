const { displayMostFavourite } = require("../Controllers/FiltersController");

const express = require("express");
const router = express.Router();


router.get("/mostFavourite", displayMostFavourite);


module.exports = router;