var app = require("../../express");
var albumModel = require("../model/album.model.server");
var imageModel = require("../model/image.model.server");


// http handlers
app.post("/api/project/:userId/album/:albumName", addImage);


function addImage(req, res) {
    var userId = req.params.userId;
    var deviation = req.body;
    var albumName = req.params.albumName;
    return imageModel.addImage(userId, deviation)
        .then(function (image) {
            albumModel.addImage(image[0]._id, albumName);
            res.json(image);
        });
}


