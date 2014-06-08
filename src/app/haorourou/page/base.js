var $ = require('$');

exports.init = function () {
    if (window.screen.width > 1280) {
        $('body').addClass('lg-screen');
    }
};