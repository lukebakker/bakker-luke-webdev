var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer2_2017");


var commentSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserProjectModel"},
    text: String,
    dateCreated: {type: Date, default: Date.now()},
    image: {type: mongoose.Schema.Types.ObjectId, ref: "imageModelProject"}
}, {collection: "commentProject"});

module.exports = commentSchema;