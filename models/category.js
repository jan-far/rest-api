const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const subject = require("./subject");

const categorySchema = new Schema({
    name: String
})

categorySchema.pre('remove', function(next) {
 subject.remove({id: this._id}).exec();
    next();
});

module.exports = mogoose.model("Category", categorySchema);