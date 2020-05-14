const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    
    req.userId = decoded.id;
    res.locals.loggedInUser = User.findById(decoded.id);
    next();
  });
};


isAdmin = (req, res, next) => {
 User.findById(req.userId)
    .then (user => 
      { User.find({_id:req.userId, role:"Admin"})
    .then(data =>{
        if (!data || data =="")
        {
          res.status(403).send({ message: "Require Admin Role!" })
          return;
        }
        if (data){
        res.status(200)
        next();
        return
      }
      },)
    });
};


isTutor = (req, res, next) => {
  User.findById(req.userId)
    .then (user => 
      { User.find({_id:req.userId, role:"Tutor"})
    .then(data =>{
        if (!data || data =="")
        {
          res.status(403).send({ message: "Must be of 'Tutor' Role!" })
          return;
        }
        if (data){
        res.status(200)
        next();
        return
      }
      },)
    });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isTutor,
};
module.exports = authJwt;
