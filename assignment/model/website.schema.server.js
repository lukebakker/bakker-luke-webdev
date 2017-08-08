var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");

var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "website"});

module.exports = websiteSchema;