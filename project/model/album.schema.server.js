var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var albumSchema = mongoose.Schema({
    _user: String,
    name: {type: String, default: "Favorites"},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "ImageProjectModel"}],
    messages: [{type: String}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "albumProject"});

module.exports = albumSchema;