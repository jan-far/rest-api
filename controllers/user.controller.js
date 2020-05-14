// const Lesson = require("../models/Category/lesson_sub");
const Category = require("../models/category");
const Subject = require("../models/subject");
const Users = require("../models/user")
// const db = require("../config");

//fiding all users
// exports.getUser = (req, res)=>{
//   const id = req.params.id; 

//   Users.findById(id)
//   .then(data =>{
//     if (!data || data =="")
//         res.status(404).send({ message: "No User found with id " + id });
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//       err.message || "Some error occurred while retrieving User."
//     });
//   });
// };

// Get loggedin user
exports.getUser = async (req,res) =>{
  try {
    const user = await Users.findById(req.userId);
    res.status(200).send(user);
  }
  catch(err){
    res.send({message: "Error in fetching user!"})
  }
}


  // Find a subject by id -WORKING
exports.findOneSub = (req, res) => {
    const id = req.params.id;
  
    Subject.findById(id)
    .populate("category", "-_id -__v")
      .then(data => {
        if (!data || data =="")
          res.status(404).send({ message: "Not found Subject with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Subject with id=" + id });
      });
  };

  // finding subjects by category
exports.findSubByCat = (req, res) => {
    const id = req.params.id;
    
    Subject.find({category: (id)}).populate("category", "-__v -_id")
    .then(data => {
      if (!data || data =="")
      res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
      .status(500)
      .send({ message: "Error retrieving Category with id=" + id });
    });
  };

//find all category
exports.findAll_Cat = (req, res) => {
    Category.find()
    .then(data => {
      return res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
          });
        });
  };

  //find all and also search for subject
exports.findAll_Sub = (req, res) => {
    const name = req.query.name;
    const mysort = {name: 1}
    var condition = name ? { name: { $regex: new RegExp(name) } } : {};
  
    Subject.find(condition).sort(mysort)
    .populate("category", "-_id -__v")
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving lessons."
      });
    });
  }; 

  //search for tutors by first name, 
  // sorted alphabetically in ascending order.
  exports.findTutor = async(req, res, next) => {
    try{
      const tutors = await Users.find(
        {firstname: req.query.firstname, role: "Tutor"},
        {_id: 0, firstname:1, lastname:1, username:1, email:1},
        {sort: {firstname:1}}
      )
      if (!tutors || tutors == "") {
        return res.status(404).json ("No tutor available at the moment")
      }
      
      return res.status(200).send({
        message: "Tutor available",
        data: tutors
      })
    }
    catch (err) {
      return next(err);
    }
  };

  // exports.fndrole = async(req,res) => {
  //   try{
  //    const Role = await Users.find({role: "Student"})
  //   //  .exec((err, user) => {
  //     // if (err) {
  //     //   res.status(500).send({ message: err });
  //     //   return;
  //     // }
  //     if (!Role) {
  //       res.status(500).send( "Unauthorized! ADMINs only" );
  //       return;
  //     }
  //     res.status(200).send({ message: Role });
  //     return;}
  
  //   catch(err){
  //     return next(err);}}
   