var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var imageSchema = mongoose.Schema({
    _user: [{type : mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    creator: String,
    comments: [{type: String}],
    favImages: [{type: mongoose.Schema.Types.ObjectId, ref: "ImageModelProject"}],
    tags: [String],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "imageProject"});

module.exports = imageSchema;