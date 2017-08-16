var mongoose = require("mongoose");
var albumSchema = require("./album.schema.server");
var db = require("./model.server");
var albumModel = mongoose.model("AlbumModelProject", albumSchema);

module.exports = albumModel;


albumModel.getAlbumsForUser = getAlbumsForUser;
albumModel.createAlbumForUser = createAlbumForUser;
albumModel.addImage = addImage;
albumModel.findAlbumByAlbumName = findAlbumByAlbumName;

function findAlbumById(albumId) {
    return albumModel.findById(albumId);
}

function createAlbumForUser(userId, albumName) {
    return albumModel.create({_user: userId, name: albumName});
}

function getAlbumsForUser(userId) {
    return albumModel.find({_user: userId});
}

    function addImage(imageId, albumName) {
        albumModel.findAlbumByAlbumName(albumName)
            .then(function (album) {
                album.images.push(imageId);
                return album.save();
            });
    }

    function findAlbumByAlbumName(albumName) {
        return albumModel.findOne({name: albumName});
    }

