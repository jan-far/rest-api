const router = require("express").Router();
const { verifySignUp } = require("../middlewares");
const { studentSignup, tutorSignup, ADMIN } = require("../controllers/auth.controller");
const { signin} = require("../controllers/auth.controller");


// router.post("/v1/admin", verifySignUp.checkDuplicateUsernameOrEmail, ADMIN);

router.post('/api/v1/student/signup',
    verifySignUp.checkDuplicateUsernameOrEmail,
    studentSignup);

router.post("/api/v1/tutor/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,tutorSignup);

router.post('/api/v1/signin', signin);

module.exports = router;

