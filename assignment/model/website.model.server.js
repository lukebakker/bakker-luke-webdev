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

function findWebsiteById (websiteId) {
    return websiteModel.findById(websiteId);
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var tempWeb = null
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
    return websiteModel.find({_user : userId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({name : website.name, description : website.description});
}
