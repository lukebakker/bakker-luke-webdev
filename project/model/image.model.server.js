var mongoose = require("mongoose");
var imageSchema = require("./image.schema.server");
var db = require("./model.server");
var imageModel = mongoose.model("ImageModelProject", imageSchema);

module.exports = imageModel;

imageModel.addImage = addImage;

function addImage(userId, deviation) {
    var image = [{
        _userId: userId, src: deviation.content.src,
        name: deviation.name, creator: deviation.author.username, deviantId: deviation.deviationid
    }];
    return imageModel.create(image);
}