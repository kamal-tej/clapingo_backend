const {register,login, displayTeachers, addToFavourites, deleteFromFavourites, displayFavouriteTeachers } = require("../Controllers/StudentController");
const authenticate = require("../MiddleWares/authenticate");

const express = require("express");
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/teachers", authenticate, displayTeachers);
router.get("/teachers/favourites", authenticate, displayFavouriteTeachers);
router.delete("/teachers/unmarkfavourite", authenticate, deleteFromFavourites);
router.post("/teachers/markfavourite", authenticate, addToFavourites);


module.exports = router;