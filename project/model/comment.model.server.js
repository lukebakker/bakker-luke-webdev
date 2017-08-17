var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server");
var db = require("./model.server");
var commentModel = mongoose.model("CommentModelProject", commentSchema);

module.exports = commentModel;



