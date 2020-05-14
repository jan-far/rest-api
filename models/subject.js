const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const subjectSchema = new Schema({
    name: {type:String, required: true},
    topic: {type:String, required: true},
    description: {type:String, required: true},
    category: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
})

module.exports = mogoose.model("Subject", subjectSchema);