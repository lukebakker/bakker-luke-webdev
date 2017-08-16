var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var imageSchema = mongoose.Schema({
    _user: [{type : mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    deviantId: String,
    creator: String,
    comments: [{type: String}],
    tags: [String],
    src: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "imageProject"});

module.exports = imageSchema;