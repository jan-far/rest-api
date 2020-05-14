const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.category = require("./category");

db.ROLES = ["Admin", "Tutor", "Student"];
db.CATEGORY = ["Primary", "Jss", "Sss"];

module.exports = db;
