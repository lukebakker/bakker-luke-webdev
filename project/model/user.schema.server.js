var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    favUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    messages: [{type: String}],
    tags: [String],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "userProject"});

module.exports = userSchema;