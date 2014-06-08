var Widget = require('widget');
var $      = require('$');
var pinTpl = require('app/haorourou/template/index/pin.tpl');
var pinModel = require('app/haorourou/model/pin.js');
var Holder = require('com/desktop/lib/holder/holder.js');

exports.init = function () {
    if (window.screen.width >= 1200) {
        $('body').addClass('lg-screen');
    }

    Widget.ready(['#pins'], function (pinWidget) {
        var isLargeScreen = $('body').hasClass('lg-screen');

        if (isLargeScreen) {
            pinWidget.setColSize(300);
        } else {
            pinWidget.setColSize(255);
        }

        pinWidget.reflow(4);

        pinModel.fetch({
            page: 1
        }, function (err, pins) {
            pins.forEach(function (pin) {
                var $pin = $(pinTpl(pin.toJSON()));
                pinWidget.add($pin);
                Widget.initWidget($pin);
            });
            Holder.run();
        });
    });

    Widget.initWidgets();
};

exports.pin = Widget.define({
    events: {
        'click [data-role="like"]': function () {
            this.config.$like.toggleClass('active');
        }
    }
});