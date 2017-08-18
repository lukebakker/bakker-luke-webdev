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
userModel.removeFollower = removeFollower;
userModel.removeFollowed = removeFollowed;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id' : googleId});
}


function removeFollower(userId, unFollowId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            for (var i = 0; i < user.following.length; ++i) {
                if (user.following[i] == unFollowId) {
                    user.following.splice(i, 1);
                    break;
                }
            }
            return user.save();
        });
}

function removeFollowed(userId, unFollowedId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            for (var i = 0; i < user.followers.length; ++i) {
                if (user.followers[i] == unFollowedId) {
                    user.followers.splice(i, 1);
                    break;
                }
            }
            return user.save();
        });
}


function findFollowing(userId) {
    return userModel.findById(userId).populate('following').exec();
}

function findFollowers(userId) {
    return userModel.findById(userId).populate('followers').exec();
}


function getUserByUsername(username) {
    return userModel.findOne({username: username});
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





