const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const LessonSchema = new Schema({
    topic: {type:String, require:true},
    subject: {type:String, require:true},
    tutor: [{
      type: mogoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    student: [{
      type: mogoose.Schema.Types.ObjectId,
      ref: "User"
    }]
}, {timestamps: true})

module.exports = mogoose.model("Lesson", LessonSchema);