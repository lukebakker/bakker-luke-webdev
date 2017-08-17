var mongoose = require("mongoose");
var albumSchema = require("./album.schema.server");
var db = require("./model.server");
var albumModel = mongoose.model("AlbumModelProject", albumSchema);

module.exports = albumModel;


albumModel.getAlbumsForUser = getAlbumsForUser;
albumModel.createAlbumForUser = createAlbumForUser;
albumModel.addImage = addImage;
albumModel.findAlbumByAlbumName = findAlbumByAlbumName;
albumModel.findAlbumById = findAlbumById;
albumModel.removeImage = removeImage;
albumModel.updateAlbum = updateAlbum;


function updateAlbum(albumId, album) {
    return albumModel.update({_id: albumId}, {$set: album});
}

function findAlbumById(albumId) {
    return albumModel.findById(albumId).populate('albums').exec();
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

function removeImage(albumId, imageId) {
    return albumModel.findAlbumById(albumId)
        .then(function (album) {
            for (var i = 0; i < album.images.length; ++i) {
                if (album.images[i] == imageId) {
                    album.images.splice(i, 1);
                    break;
                }
            }

            return album.save();
        })
}
