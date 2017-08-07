var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var userModel = require("user.model.server.js");

module.exports = widgetModel;



