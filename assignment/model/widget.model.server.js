var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("./page.model.server");

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.updateHeading = updateHeading;
widgetModel.updateImage = updateImage;
widgetModel.updateYouTube = updateYouTube;
widgetModel.deleteWidget = deleteWidget;
widgetModel.setIndex = setIndex;
widgetModel.updateHtml = updateHtml;
widgetModel.updateText = updateText;

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

    return pageModel.findPageById(pageId)
        .then(function (data) {
            console.log("here");
            console.log(data);
            return data;
        });
}

function updateHeading(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: {text: widget.text, size: widget.size}});
}
function updateImage(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name, text: widget.text,
            url: widget.url, width: widget.width
        }
    });
}
function updateYouTube(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name, text: widget.text,
            url: widget.url, width: widget.width
        }
    });
}

function updateHtml(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: {text: widget.text}});
}

function updateText(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            text: widget.text, rows: widget.rows,
            formatted: widget.formatted, class: widget.class, name: widget.name, placeholder: widget.placeholder
        }
    });
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

function setIndex(start, end, pageId) {
    return findWidgetsByPageId(pageId)
        .then(function (widgets) {
            var temp = widgets[start];
            widgets[start] = widgets[end];
            widgets[end] = temp;
            return widgets.save();
        });
}




