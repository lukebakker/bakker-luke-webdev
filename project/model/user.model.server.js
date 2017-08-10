var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./model.server");
var userModel = mongoose.model("UserModelProject", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.getAllUsers = getAllUsers;
userModel.deleteUser = deleteUser;
userModel.getUserByUsername = getUserByUsername;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function getUserByUsername(username) {
    return userModel.find({username: username});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

function getAllUsers() {
    return userModel.find();
}

function createUser(user) {
    return userModel.create(user);
}


function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({username: username}, {password: password})
}

function addWebsite(userId, websiteId) {
    userModel.findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId, websiteId) {
    userModel.findUserById(userId)
        .then(function(user) {
            var newWebsites = [];
            var websites = user.websites;
            for(var u in websites) {
                if (websites[u]._id === websiteId) {
                    newWebsites.push(websites[u]);
                }
            }
            user.websites = newWebsites;
            return user.save();
        })
}

