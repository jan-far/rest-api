const router = require("express").Router();
const { verifySignUp } = require("../middlewares");
const { studentSignup, tutorSignup, ADMIN } = require("../controllers/auth.controller");
const { signin} = require("../controllers/auth.controller");


router.post("/admin", verifySignUp.checkDuplicateUsernameOrEmail, ADMIN);

router.post('/api/student/signup',
    verifySignUp.checkDuplicateUsernameOrEmail,
    studentSignup);

router.post("/api/tutor/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,tutorSignup);

router.post('/api/signin', signin);

module.exports = router;

