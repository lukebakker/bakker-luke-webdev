var app = require("../../express");
var albumModel = require("../model/album.model.server");
var imageModel = require("../model/image.model.server");



// http handlers
app.post("/api/project/:userId", addImage);
app.get("/api/project/user/:userId/albums", getAlbumsForUser);

function getAlbumsForUser(req, res) {
    var userId = req.query.userId;
    return albumModel.getAlbumsForUser(userId)
        .then(function (albums) {
            res.json(albums);
        })
}

function addImage(req, res) {
    var userId = req.query.userId;
    var deviation = req.body;
    return imageModel.addImage(userId, deviation)
        .then(function(image) {
            return albumModel.addImage(userId, image);
        });
}


