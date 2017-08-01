var app = require("../express");


app.get("/api/user/:userId/website/:websiteId/page", findPagesForUser);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.delete("/api/user/:userId/website/:websiteId/page", deletePage);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for (var u in pages) {
        if (pages[u]._id === pageId) {
            pages[u] = page;
            res.send(page);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var newPageList = [];
    for (var w in pages) {
        if (pages[w]._id != pageId) {
            newPageList.push(pages[w]);
        }
    }
    pages = newPageList;
    res.json(newPageList);
}
function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";

    pages.push(page);
    res.json(page);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for (var w in pages) {
        if (pages[w]._id === pageId) {
            res.json(pages[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findPagesForUser(req, res) {
    var websiteId = req.params.websiteId;

    var newPages = [];

    for (var w in pages) {
        if (pages[w].websiteId === websiteId) {
            newPages.push(pages[w]);
        }
    }
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