var app = require("../../express");

var widgetModel = require("../model/widget.model.server");
var pageModel = require("../model/page.model.server");

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetsForUser);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget/new", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit", findWidgetById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit", updateWidget);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit", deleteWidget);
app.put("/api/page/:pageId", setIndex);


var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

//image upload stuff
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../public/uploads'});
app.post("/api/upload", upload.single('myFile'), uploadImage);


function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var widget = getWidgetByIdLocally(widgetId);
    widget.url = '/uploads/' + filename;
    var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId;
    res.redirect(callbackUrl);
}

function setIndex(req, res) {
    var start = req.query.start;
    var end = req.query.end;
    var pageId = req.params.pageId;
    widgetModel.setIndex(start, end, pageId)
        .then(function (page) {
            res.json(page);
        })

}


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget._page = pageId;
    widgetModel.createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget._id);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    if (widget.type === "HEADING") {
        return widgetModel.updateHeading(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    } else if (widget.type === "IMAGE") {
        return widgetModel.updateImage(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    } else if (widget.type === "YOUTUBE") {
        return widgetModel.updateYouTube(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    } else if (widget.type === "HTML") {
        return widgetModel.updateHtml(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
    else if (widget.type === "TEXT") {
        return widgetModel.updateText(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

function getWidgetByIdLocally(widgetId) {
    return widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        })

}

function findWidgetsForUserLocally(pageId) {
    return widgetModel.findWidgetsByPageId(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}


function findWidgetsForUser(req, res) {
    var pageId = req.params.pageId;
    widgetModel.findWidgetsByPageId(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel.deleteWidget(pageId, widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


