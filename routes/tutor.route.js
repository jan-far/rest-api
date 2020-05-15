const { authJwt } = require("../middlewares");
const controller = require("../controllers/tutor.controller");
const router = require("express").Router();

// registering to take a course
router.post("/api/v1/takesubject/:id", authJwt.verifyToken, authJwt.isTutor, controller.regSub);

// retrieving all registered course
router.get("/api/v1/mysubjects/", authJwt.verifyToken, authJwt.isTutor, controller.sub_reg);

// updating a registered suject
router.put("/api/v1/mysubject/:id", authJwt.verifyToken, authJwt.isTutor, controller.update_reg);

// deleting a registered subject
router.delete("/api/v1/mysubject/:id", authJwt.verifyToken, authJwt.isTutor, controller.delete_reg);

module.exports = router;