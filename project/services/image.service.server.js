var app = require("../../express");
var albumModel = require("../model/album.model.server");
var imageModel = require("../model/image.model.server");


// http handlers
app.post("/api/project/:userId/album/:albumName", addImage);
app.get("/api/project/:userId/image/:imageId", getImageById);


function getImageById(req, res) {
    var imageId = req.params.imageId
    return imageModel.getImageById(imageId)
        .then(function (image) {
            res.json(image);
        })

}


function addImage(req, res) {
    var userId = req.params.userId;
    var deviation = req.body;
    var albumName = req.params.albumName;
    return imageModel.addImage(userId, deviation)
        .then(function (image) {
            albumModel.addImage(userId, image[0]._id, albumName);
            res.json(image);
        });
}


