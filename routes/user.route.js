const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const router = require("express").Router();


//get current logged in user
router.post("/api/v1/me", [authJwt.verifyToken], controller.getUser);

//find a subject in a category
router.get("/api/v1/subject/:id", [authJwt.verifyToken], controller.findOneSub);

//finding all subject by category
router.get("/api/v1/subject/category/:id", [authJwt.verifyToken], controller.findSubByCat);

//finding all category
router.get("/api/v1/category/", [authJwt.verifyToken], controller.findAll_Cat);

//search for all subject, by name
router.get("/api/v1/subject/", [authJwt.verifyToken], controller.findAll_Sub);

// searching for tutor by firstname
router.get("/api/v1/tutors", [authJwt.verifyToken], controller.findTutor);

module.exports = router;