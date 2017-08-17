var app = require("../../express");
var userModel = require("../model/user.model.server");



// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.get("/api/project/user/username", getUserByUsername);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/user/:userId/following", findFollowing);
app.get("/api/user/:userId/followers", findFollowers);


function findFollowers(req, res) {
    var userId = req.params.userId;
    return userModel.findFollwers(userId)
        .then(function (followers) {
            res.json(followers);
        })
}

function findFollowing(req, res) {
    var userId = req.params.userId;
    return userModel.findFollowing(userId)
        .then(function (following) {
            res.json(following);
        })
}

function getUserByUsername(req, res) {
    var username = req.query.username;
    userModel.getUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel.deleteUser(userId)
        .then(function (user) {
            res.send(user);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel.updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function registerUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function getAllUsers(req, response) {
    userModel.getAllUsers
        .then(function (users) {
            res.json(users);
        });
}


function getUserById(req, response) {
    userModel.findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
}


