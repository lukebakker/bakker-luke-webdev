var app = require("../../express");
var userModel = require("../model/user.model.server");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var bcrypt = require('bcrypt-nodejs');

app.post("/api/login", login);


// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.post("/api/user", findUser);

app.get("/api/project/user/username", getUserByUsername);
app.post("/api/user/register", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/user/:userId/following", findFollowing);
app.get("/api/user/:userId/followers", findFollowers);
app.get("/api/checkLogin", checkLogin);


function login(req, resp) {
    var username = req.body.username;
    var password = req.body.password;
    userModel
        .getUserByUsername(username)
        .then(function (user) {
            if (!user) {
                resp.send(null);
                return;
            }
            bcrypt.compare(password, user.password, function (err, res) {
                if (res) {
                    req.login(user, function (nothing) {
                        resp.send(user);
                        return;
                    })
                } else {
                    resp.send(null);
                    return;
                }
            });
        }, function (err) {
            if (err) {
                resp.send(err);
            }
        });
}

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

    bcrypt.hash(user.password, null, null, function (err, hash) {

        user.password = hash;

        userModel.createUser(user)
            .then(function (user) {
                res.json(user);
            });
    });
}


function findUser(req, res) {
    var body = req.body;
    var username = body.username;
    var password = body.password;
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function getAllUsers(req, res) {
    userModel.getAllUsers()
        .then(function (users) {
            console.log(users);
            res.json(users);
        })

}


function getUserById(req, response) {
    userModel.findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function checkLogin(req, res) {
    res.send(isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}


