const authJwt = require("../middlewares/authJWT");
const verifySignUp = require("../middlewares/verifySignup");
module.exports = {
  authJwt,
  verifySignUp,
};
