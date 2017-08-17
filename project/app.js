var db = require('./model/model.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer2_2017');
if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137220.mlab.com:37220/heroku_xkpv7xx0'; // user yours
}

require("./model/model.server");

require("./model/user.model.server");
require("./services/user.service.server");

require("./services/album.service.server");
require("./model/album.model.server");

require("./model/image.model.server");
require("./services/image.service.server");

require("./model/comment.model.server");
require("./model/comment.schema.server");


/*
 require("./services/website.service.server");
 require("./services/page.service.server");
 require("./services/widget.service.server");
 require("./model/user.model.server");
 require("./model/user.schema.server");
 */


