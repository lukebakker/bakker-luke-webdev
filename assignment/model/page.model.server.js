var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./model.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("./website.model.server");

module.exports = pageModel;

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.updatePage = updatePage;

function createPage(websiteId, page) {
    var tempPage = null;
    return pageModel.create(page)
        .then(function (pageDoc) {
            tempPage = pageDoc;
            return websiteModel.addPage(websiteId, tempPage._id);
        }).then(function () {
            return tempPage;
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findPagesByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId});
}

function updatePage(pageId, page) {
    return pageModel.update()
}


