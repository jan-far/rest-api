const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {type: String, required:true},
  lastname: {type: String, required:true},
  username: {type: String, required:true},
  email: {type: String, required:true},
  password: {type: String, required:true},
  role: [{
      type: String,
      enum: ["Admin", "Tutor", "Student"],
      required:true
    }]
}, {timestamps: true });

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
  }
});

  module.exports = mongoose.model("User", userSchema);