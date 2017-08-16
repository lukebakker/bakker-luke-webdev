var mongoose = require("mongoose");
var albumSchema = require("./album.schema.server");
var db = require("./model.server");
var albumModel = mongoose.model("AlbumModelProject", albumSchema);

module.exports = albumModel;

albumModel.addImage = addImage;
albumModel.getAlbumsForUser = getAlbumsForUser;

function addImage(userId, image) {
   return  albumModel.create({_user: userId, image: image});
}

function getAlbumsForUser(userId) {
    return albumModel.find({_user: userId});
}
