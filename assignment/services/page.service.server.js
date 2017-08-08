var app = require("../../express");

var websiteModel = require("../model/website.model.server");
var pageModel = require("../model/page.model.server");


app.get("/api/user/:userId/website/:websiteId/page", findPagesForUser);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    console.log(pageId, page);
    return pageModel.updatePage(pageId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        })

}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel.deletePage(websiteId, pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page._website = websiteId;
    return pageModel.createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    return pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPagesForUser(req, res) {
    var websiteId = req.params.websiteId;

    return pageModel.findPagesByWebsiteId(websiteId)
        .then(function (pages) {
            res.json(pages);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}
