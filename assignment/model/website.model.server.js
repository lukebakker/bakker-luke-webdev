var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./model.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userModel);

module.exports = websiteModel;
websiteModel.createWebsiteForUser = createWebsiteForUser;

function createWebsiteForUser(userId, website) {
    return websiteModel.create(website, {_user: userId})
}


