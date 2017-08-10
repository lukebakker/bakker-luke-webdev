var app = require("../../express");
var userModel = require("../model/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.get("/api/user/username", getUserByUsername);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function getUserByUsername(req, res) {
    var username = req.query.username;
    userModel.findUserByUsername(username)
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

