var Widget = require('widget');
var $      = require('$');
var Holder = require('com/desktop/lib/holder/holder.js');
var pinModel = require('app/haorourou/model/pin.js');
var pinTpl = require('app/haorourou/template/detail/pin.tpl');

exports.init = function () {
    Widget.ready(['#pins'], function (pinWidget) {
        pinModel.fetch({}, function (err, pins) {
            pins.forEach(function (pin) {
                pin = pin.toJSON();
                var height = parseInt(104 * pin.height / pin.width);
                var $pin = $(pinTpl({
                    img: 'holder.js/104x'+ height +'/#a2e0af:#81b38c/text: pin',
                    id: pin.id,
                    height: height
                }));
                pinWidget.add($pin);
            });
            Holder.run();
        });
    });
    Widget.initWidgets();
};