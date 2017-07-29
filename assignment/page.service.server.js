var app = require("../express");


app.get("/api/user/:userId/website/:websiteId/pages", findPagesById);
app.post("/api/user/:userId/website/:websiteId/pages", createPage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";

    pages.push(page);
    res.json(page);
}

function findPagesById(req, res) {
    for (var w in pages) {
        if (pages[w]._id === req.params.pageId) {
            res.json(pages[w]);
        }
    }
    res.sendStatus(404);
}

function findPagesForUser(req, res) {
    var websiteId = req.params.websiteId;

    var newPages = [];

    for (var w in pages) {
        if (pages[w].websiteId === websiteId) {
            newPages.push(websites[w]);
        }
    }
    console.log(newPages);
    res.json(newPages);
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;

    var newPages = [];

    for (var w in pages) {
        if (pages[w].websiteId === websiteId) {
            newPages.push(pages[w]);
        }
    }

    res.json(newPages);
}