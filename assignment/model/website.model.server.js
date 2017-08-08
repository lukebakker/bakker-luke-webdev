var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./model.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userModel);

module.exports = websiteModel;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

function deleteWebsite(userId, websiteId) {
    var tempWeb = null;
    return websiteModel.findByIdAndRemove(websiteId)
        .then(function (website) {
            tempWeb = website;
            return userModel.removeWebsite(userId, website._id);
        })
        .then(function () {
            return tempWeb;
        })
}


function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var tempWeb = null;
    return websiteModel.create(website)
        .then(function (websiteDoc) {
            tempWeb = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function () {
            return tempWeb;
        });
}

function findWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: {name: website.name, description: website.description}});
}

function addPage(websiteId, pageId) {
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId) {
    websiteModel.findWebsiteById(websiteId)
        .then(function(website) {
            var newPages = [];
            var pages = website.pages;
            for(var u in pages) {
                if (pages[u]._id === pageId) {
                    newPages.push(pages[u]);
                }
            }
            website.pages = newPages;
            return website.save();
        })
}
