var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./model.server");
var pageModel = mongoose.model("PageModel", pageSchema);

module.exports = pageModel;




