var app = require("../../express");


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
    console.log(widgetId);
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
    console.log(widget);
    widget.url = '/uploads/' + filename;
    var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId;
    res.redirect(callbackUrl);
}

function setIndex(req, res) {
    var start = req.query.start;
    var end = req.query.end;
    var pageId = req.params.pageId;
    if (widgets[start].pageId === widgets[end].pageId) {

        var temp = widgets[start];
        widgets[start] = widgets[end];
        widgets[end] = temp;
    }
    res.json(widgets);

}


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    for (var u in widgets) {
        if (widgets[u]._id === widgetId) {
            widgets[u] = widget;
            res.send(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    for (var w in widgets) {
        if (widgets[w]._id === req.params.widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function getWidgetByIdLocally(widgetId) {
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            return (widgets[w]);
        }
    }

}


function findWidgetsForUser(req, res) {
    var pageId = req.params.pageId;
    var newWidgets = [];

    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            newWidgets.push(widgets[w]);
        }
    }
    res.json(newWidgets);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    var newWidgetList = [];

    for (var u in widgets) {
        if (widgets[u]._id != widgetId) {
            newWidgetList.push(widgets[u]);
        }
    }
    widgets = newWidgetList;
    res.send(newWidgetList);
}


