const Category = require("../models/category");
const Subject = require("../models/subject");
const Users = require("../models/user");
const Lesson = require("../models/lesson");


// fiding all users
exports.getUsers = (req, res)=>{
  // const id = req.params.id; 
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username) } } : {};

  Users.find(condition)
  .then(data =>{
    if (!data || data =="")
        res.status(404).send({ message: "No User found with id " + id });
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:err.message,
       error:"Some error occurred while retrieving User. Invalid query"
       
    });
  });
};
// regidter to take subject
exports.createSub = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Subject
  const subject = new Subject({
    name: req.body.name,
    topic: req.body.topic,
    description:req.body.description
  });

  // Save Subject in the database
  subject
  .save ((err, subject) =>{
    if (err)  {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.category) {
      Category.find(
        {
          name: { $in: req.body.category}
        },
        (err, category) => {
          if (err) { 
            res.status(500).send({ message: err });
            return;
          }

          subject.category = category.map(category => category._id);
          subject.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            
            res.status(200).send({
              message: "Subject created successfully",
              id:subject._id,
              name:subject.name,
              topic: subject.topic,
              description:subject.description,
              category: subject.category

            });
      })
    });
  }})
};

//find and update a subject
exports.update_sub = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Subject.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subject with id=${id}. Maybe Category was not found!`
        });
      } 
      else res.send({ message: "Subject was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subject with id=" + id
      });
    });
};

//Deleting one subject
exports.deleteSub = (req, res) => {
  const id = req.params.id;

  Subject.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Subject with id=${id}. Maybe Subject already deleted!`
        });
      } else {
        res.send({
          message: "Subject was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subject with id=" + id
      });
    });
};

// find and update category
exports.update_cat = (req, res) => {
  if(!req.body || req.body =="") {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
    return 
  } 
    
  const id = req.params.id;
  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update category with id=${id}. Maybe Category was not found!`
        });
      } 
      res.send({ message: "category was updated successfully.", data:data});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating category with id=" + id
      });
    });
};

// Deleting one category along with subject
exports.deleteCat = async(req, res) => {
  const id = req.params.id;

  const cat = await Category.deleteOne({_id:id})
  const sub = await Subject.deleteMany({category:id})

      if (!cat) { 
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category alread deleted!`
        });
      } 
      // else {
        return res.send({
          message: "Category was deleted with subjects successfully!",
        });
    }

// Get all tutors
exports.getTutors = async(req, res, next) => {
  try{
    const tutors = await Users.find({role:"Tutor"},
      {_id: 1, firstname:1, lastname:1, username:1, email:1},
      {sort: {firstname:1}}
    )
    if (!tutors) {
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

// find a tutor by id
exports.get_a_Tutor = async(req, res, next) => {
  const id = req.params.id;

  try{
    const tutors = await Users.findById(id,
      {_id: 1, firstname:1, lastname:1, username:1, email:1},
      {sort: {firstname:1}}
    )
    if (!tutors) {
      return res.status(404).json ({message:"tutor not found at the moment"})
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

// deactivate a tutor
exports.deleteTutor = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndDelete(id,{role:"Tutor"})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutor with id=${id}. Maybe Tutor was not found!`
        });
      } else {
        res.send({
          message: "Tutor was deactivated successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not deactivate Tutor with id=" + id
      });
    });
};

//Create a subject lesson
exports.createLesson = (req, res) => {
  // Validate request
  if (!req.body.subject || !req.body.topic) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
   var student = Users.findOne({username:req.query.username})
   student.exec(function (err, student) {
       if (err) {
         res.status(500).send(err);
         return;
       }
      
       var tutor = Users.findOne({firstname:req.query.firstname, lastname:req.query.lastname})

        tutor.exec(function (err, tutor) {
          if(err)
          {
            res.status(500).send({message: err})
          }
          
          const lesson = new Lesson({
          topic: req.body.topic,
          subject: req.body.subject,
          student: student,
          tutor: tutor
          });
       lesson.save((err, lesson)=>{
        if (err){
          res.status(500).send({message: err})
        }
        else if(lesson){
          res.status(200).send({message:"Lesson created successfuly"})
        }
      });
      })
      
    }
  )
};

//  retrieving all lessons
exports.getLessons = async(req, res, next) => {
  try{
    const lesson = await Lesson.find()
    .populate("tutor student", "-createdAt -updatedAt -id")
    
    if (!lesson || lesson =="") {
      return res.status(404).json ("No lesson available at the moment")
    }
    return res.status(200).send({
      message: "Lessons found and available",
      data: lesson
    })
  }
  catch (err) {
    return next(err);
  }
};

// Find a lesson by id
exports.findOneLesson = (req, res) => {
  const id = req.params.id;

  Lesson.findById(id)
  .populate("tutor", "-_id -__v")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving lesson with id=" + id });
    });
}

// Updatting a lesson by id
exports.Update_les = (req, res) => {
  const id = req.params.id;

  Lesson.findOneAndUpdate(id, {useFindAndModify: false })
  .populate("tutor", "-_id -__v")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error updating lesson with id=" + id });
    });
};

// Deleting a lesson
exports.deleteLesson = (req, res) => {
  const id = req.params.id;

  // Lesson.deleteMany()
  Lesson.findOneAndDelete(id, { useFindAndModify: false })
  .populate("tutor", "-_id -__v")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lesson with id " + id });
      else 
      res.send("lesson with id="+id+"deleted successfully!");
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error deleting lesson with id=" + id });
    });
};

// makineg a tutor an admin
exports.makeAdmin = (req, res) =>{
  if (!req.body.role) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id

  Users.findByIdAndUpdate (id, req.body.role, { useFindAndModify: false })
  .then(data => {
    // Users.findById(id)
    // .then (user => 
    //   { Users.find({_id:req.userId, role:"Admin"})
    if (!data || data =="") {
      res.status(404).send({
        message: `Cannot Upgrade tutor with id=${id}. Maybe Tutor was not found!`
      });
    } 
    else res.send({ message: "Tutor was upgraded successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error upgrading TUTOR with id=" + id
    });
  });
}