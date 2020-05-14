const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const regSchema = new Schema ({
    subject:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    tutor:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = mogoose.model("Course_reg", regSchema);