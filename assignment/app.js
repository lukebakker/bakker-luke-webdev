
var db = require('./model/model.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer2_2017');


require("./model/model.server");

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
require("./model/user.model.server");
require("./model/user.schema.server");


