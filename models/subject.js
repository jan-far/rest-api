const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const Reg = require("../models/registration");

const subjectSchema = new Schema({
    name: {type:String, required: true},
    topic: {type:String, required: true},
    description: {type:String, required: true},
    category: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    tutor: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "User",
    }
})


subjectSchema.pre("remove", function (next) {
    Reg.findByIdAndDelete(id)
    next();
}) 
module.exports = mogoose.model("Subject", subjectSchema);