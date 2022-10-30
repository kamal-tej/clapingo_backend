const {register,login, displayTeachers, addFavourites } = require("../Controllers/StudentController");
const authenticate = require("../MiddleWares/authenticate");

const express = require("express");
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/teachers", authenticate, displayTeachers);
router.post("/favourites", authenticate, addFavourites);


module.exports = router;