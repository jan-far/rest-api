const Category = require("../models/category");
const Subject = require("../models/subject");
const Users = require("../models/user");
const Reg = require("../models/registration");


// regidter to take subject
exports.regSub = (req, res) => {
    id = req.params.id;

    // Save registration in the database
   var subject = Subject.findById(id)
   subject.exec(function (err, subject) {
    
    if (!subject){
      res.status(403).send({message:"Subject not found!"})
      return;
    }

       if (err) {
         res.status(500).send(err);
         return;
       }
      
       var tutor = Users.findById(req.userId)
        tutor.exec(function (err, tutor) {
          if(err)
          {
            res.status(500).send({message: err})
          }
          const reg = new Reg({ 
          topic: req.body.topic,
          subject: req.body.subject,
          subject:subject,
          tutor: tutor
        });
       reg.save((err, reg)=>{
        if (err){
          res.status(500).send({message: err})
        }
        else if(reg){
          res.status(200).send({message:"Registration successful!"})
        }
      });
      })
      
    }
  )
};

// retrieving all registered subject
exports.sub_reg = (req, res) =>{
  var tutor = Reg.find({tutor: req.userId})
  .populate("subject", " -__v -id -createdAt -updatedAt")

  tutor.exec(function (err, tutor) {
    if (err){
      res.status(500).send({message:err})
    }
    if (!tutor || tutor == ""){
      res.status(403).send("You have not registered to take a subject")
    }
    else if (tutor){
      res.status(500).send({
        message: "Found your registered subject",
        registered:tutor,
      })
    }
  })
};

// Updating registered subject
exports.update_reg = (req, res) =>{
  if(!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
    return
  }
  
  const tutor = Reg.find({tutor: req.userId})
  .then(tutor => {
    if(!tutor || tutor==""){
      res.send("You have not registered to take a subject")
      return
    }
    
    var id = req.params.id

    Subject.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(sub =>{
      if (!sub || sub == "")
      {
        res.status(403).send("You are not registered to the subject")
        return;
      }

      else if (sub)
      {
        res.status(200).send({
          message: "Found and update registered subject",
        })
      }
    }) 
  })
};

// deleting registered subject
exports.delete_reg = (req, res) =>{
  if(!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
    return
  }
  
  const tutor = Reg.find({tutor: req.userId})
  .then(tutor => {
    if(!tutor || tutor==""){
      res.send({message:"You have not registered, nothing to delete"})
      return
    }
    
    const id = req.params.id;

    const sub = Subject.deleteOne({_id:id})
    .then(sub =>{
       if(!sub){
      res.status(403).send({message:"Subject not registered"})
      return;
    };
    })

    const reg = Reg.deleteMany({subject:id})

    if(!reg){
      res.status(403).send({message:"Subject not registered"})
      return;
    };

    reg.exec((err,regs) =>{
      if (err){
        res.status(500).send({message:err})
        return;
      }
      
      if (!regs){
        res.status(403).send({message:"cannot delete, please register first"})
        return;
      };

      if (regs){
      res.status(200).send({
          message: "Found and deleted registered subject",
        })
      }
    }) 
  })
};