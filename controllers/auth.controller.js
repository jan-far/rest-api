const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



// exports.ADMIN = (req,res) => {
//   const user = new User({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     username: req.body.username,
//     email: req.body.email,
//     role: "Admin",
//     password: bcrypt.hashSync(req.body.password, 12)
//   });

//   user.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     res.send({ message: "Admin created successfully!" });
//         });
//   };


exports.studentSignup = (req, res) => {
  if(!req.body.email|| !req.body.password || !req.body.firstname ||!req.body.lastname) {
    res.status(400).send({
       status: false,
       message: "All fields are required"
})
return;
}
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    role: "Student",
    password: bcrypt.hashSync(req.body.password, 12)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Student was registered successfully!" });
        });
  };
  
exports.tutorSignup = (req, res) => {
  if(!req.body.email|| !req.body.password || !req.body.firstname ||!req.body.lastname) {
    res.status(400).send({
       status: false,
       message: "All fields are required"
})
return;
}
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    role: "Tutor",
    password: bcrypt.hashSync(req.body.password, 12)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Tutor was registered successfully!" });
        });
  };

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    });
};