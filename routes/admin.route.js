const { authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");
const router = require("express").Router();


// Getting all users
router.get(
    "/api/v1/users/",[authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers)

// Creating a subject
router.post("/api/v1/subject/register",[authJwt.verifyToken, authJwt.isAdmin], controller.createSub);

// Updating a subject
router.put("/api/v1/subject/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update_sub);

// Deleting a subject in a category
router.delete("/api/v1/subject/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteSub);

//Updating a category
router.put("/api/v1/category/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update_cat);

// deleting a category (along with subject)
router.delete("/api/v1/category/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCat);

// retrieving all tutors
router.get("/api/v1/istutor", [authJwt.verifyToken, authJwt.isAdmin], controller.getTutors);

// retreving a tutor
router.get("/api/v1/tutor/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.get_a_Tutor);

// deactivating a tutor
router.delete("/api/v1/tutor/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteTutor);

// Booking lessons
router.post("/api/v1/lesson/register/", [authJwt.verifyToken, authJwt.isAdmin], controller.createLesson);

// retrieving all lesson
router.get("/api/v1/lesson", [authJwt.verifyToken, authJwt.isAdmin], controller.getLessons);

// get a lesson
router.get("/api/v1/lesson/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOneLesson);

// updating a lesson
router.put("/api/v1/lesson/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.Update_les);

// deleting a lesson
router.delete("/api/v1/lesson/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteLesson);

// making a tutor an admin
router.put("/api/v1/tutor/role/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.makeAdmin);






module.exports = router;