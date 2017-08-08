var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/webdev_summer2_2017");

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: {type: [mongoose.Schema.Types.ObjectId], ref: "PageModel"},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "page"});

module.exports(pageSchema);