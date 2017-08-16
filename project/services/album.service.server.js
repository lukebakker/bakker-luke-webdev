var app = require("../../express");
var albumModel = require("../model/album.model.server");
var imageModel = require("../model/image.model.server");
var userModel = require("../model/user.model.server");


// http handlers
app.post("/api/project/:userId", addImage);
app.get("/api/project/user/:userId/albums", getAlbumsForUser);
app.post("/api/project/user/:userId/album/create/:albumName", createAlbumForUser);

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


