var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("./page.model.server");

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.setIndex = setIndex;

function createWidget(pageId, widget) {
    var tempWidget = null;
    return widgetModel.create(widget)
        .then(function (widgetDoc) {
            tempWidget = widgetDoc;
            return pageModel.addWidget(pageId, tempWidget._id);
        }).then(function () {
            return tempWidget;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({_page: pageId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {widget: widget});
}

function deleteWidget(pageId, widgetId) {
    var tempWidget = null;
    return widgetModel.findByIdAndRemove(widgetId)
        .then(function (widget) {
            tempWidget = widget;
            return pageModel.removeWidget(pageId, widget._id);
        })
        .then(function () {
            return tempWidget;
        })
}

function setIndex(start, end) {
    if (widgets[start].pageId === widgets[end].pageId) {

        var temp = widgets[start];
        widgets[start] = widgets[end];
        widgets[end] = temp;
    }
}




