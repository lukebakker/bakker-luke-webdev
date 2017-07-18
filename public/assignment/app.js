/**
 * Created by lbakker on 7/17/17.
 */
var app = angular.module("WamApp", [])

app.controller("loginController", loginController);
// JSON = JavaScript Object Notation
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
]

function loginController($scope) {

    $scope.login = function (users) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password) {
                $scope.welcomeUser = _user;
            }
        }
        /*$scope.login = function (user) {
         alert(user.username + ' ' + user.password);
         }*/
    }
}