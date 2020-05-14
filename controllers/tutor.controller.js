const Category = require("../models/category");
const Subject = require("../models/subject");
const Users = require("../models/user");
const Reg = require("../models/registration");


// regidter to take subject
exports.regSub = (req, res) => {
    id = req.params.id;

    const reg = new Reg({});
    // Save registration in the database
    reg.save ((err, reg) =>{
      if (req.body.tutor){
        Users.findById(req.userId,
        (err, tutor) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          reg.tutor = tutor.map(tutor => tutor._id);
          reg.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
        })}
    )}});
    

    reg.save ((err, reg) =>{
      if (req.body.subject) {
        Subject.find({id},
          (err, subject) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            reg.subject = subject.map(subject => subject._id);
            reg.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              
              res.status(200).send({
                message: "Subject created successfully",
                // id:subject._id,
                // name:subject.name,
                // topic: subject.topic,
                // subject: subject.subject
  
              });
        })
        
  });
    }
  })
   
  };