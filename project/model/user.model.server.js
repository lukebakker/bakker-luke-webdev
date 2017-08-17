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
userModel.addAlbum = addAlbum;
userModel.findFollowing = findFollowing;
userModel.findFollwers = findFollowers;


module.exports = userModel;

function findFollowing(userId) {
    return userModel.findById(userId).populate('following').exec();
}

function findFollowers(userId) {
    return userModel.findById(userId).populate('followers').exec();
}


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

function addAlbum(userId, albumId) {
    userModel.findUserById(userId)
        .then(function (user) {
            user.albums.push(albumId);
            return user.save();
        });
}





