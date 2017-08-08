var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});

module.exports = userSchema;