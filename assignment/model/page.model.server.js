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
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

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
    return pageModel.update({_id: pageId}, {
        $set: {description: page.description, name: page.name}
    });
}

function deletePage(websiteId, pageId) {
    var tempPage = null;
    return pageModel.findByIdAndRemove(pageId)
        .then(function (page) {
            tempWeb = page;
            return websiteModel.removePage(websiteId, page._id);
        })
        .then(function () {
            return tempPage;
        })
}


function addWidget(pageId, widgetId) {
    pageModel.findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId) {
    pageModel.findPageById(pageId)
        .then(function(page) {
            var newWidgets = [];
            var widgets = page.widgets;
            for(var u in widgets) {
                if (widgets[u]._id === widgetId) {
                    newWidgets.push(widgets[u]);
                }
            }
            page.widgets = newWidgets;
            return page.save();
        })
}


