var $ = require('$');
var Holder = require('com/desktop/lib/holder/holder.js');

exports.init = function () {
    if (window.screen.width > 1280) {
        $('body').addClass('lg-screen');
    }

    Holder.run();
};