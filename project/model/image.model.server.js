var mongoose = require("mongoose");
var userSchema = require("./image.schema.server");
var db = require("./model.server");
var imageModel = mongoose.model("ImageModelProject", imageSchema);

module.exports = imageModel;