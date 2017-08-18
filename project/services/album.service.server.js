var app = require("../../express");
var albumModel = require("../model/album.model.server");
var imageModel = require("../model/image.model.server");
var userModel = require("../model/user.model.server");


// http handlers
app.post("/api/project/:userId", addImage);
app.get("/api/project/user/:userId/albums", getAlbumsForUser);
app.post("/api/project/user/:userId/album/create/:albumName", createAlbumForUser);
app.get("/api/project/user/:userId/album/:albumId", findAlbumById);
app.delete("/api/project/albums/:albumId/image/:imageId", removeImage);
app.put("/api/project/albums/:albumId/update", updateAlbum);
app.put("/api/project/album/:albumId/:imageId", addImageToAlbum);

function addImageToAlbum(req, res) {
    var albumId = req.params.albumId;
    var imageId = req.params.imageId;
    return albumModel.addImageToAlbum(imageId, albumId);
}


function findAlbumById(req, res) {
    var albumId = req.params.albumId;
    return albumModel.findAlbumById(albumId)
        .then(function (album) {
            res.json(album);
        })

}

function findAlbumByIdLocal(albumId) {
    return albumModel.findAlbumById(albumId)
        .then(function (album) {
            return album;
        })

}

function createAlbumForUser(req, res) {
    var userId = req.params.userId;
    var albumName = req.params.albumName;
    return albumModel.createAlbumForUser(userId, albumName)
        .then(function (album) {
            userModel.findUserById(userId)
                .then(function (user) {
                    userModel.addAlbum(userId, album._id);
                    res.json(user);
                });
        })
}

function getAlbumsForUser(req, res) {
    var userId = req.params.userId;
    return albumModel.getAlbumsForUser(userId)
        .then(function (albums) {
            res.json(albums);
        })
}

function addImage(req, res) {
    var userId = req.query.userId;
    var deviation = req.body;
    return imageModel.addImage(userId, deviation)
        .then(function (image) {
            return albumModel.addImage(userId, image);
        });
}


function removeImage(req, res) {
    var albumId = req.params.albumId;
    var imageId = req.params.imageId;
    return imageModel.removeImage(imageId)
        .then(function (image) {
            findAlbumByIdLocal(albumId)
                .then(function (album) {
                    albumModel.removeImage(albumId, imageId);
                    res.json(album);
                })
        })
}

function updateAlbum(req, res) {
    var albumId = req.params.albumId;
    var album = req.body;
    return albumModel.updateAlbum(albumId, album)
        .then(function (album) {
            res.json(album);
        })
}




