var config = {
    baseUrl: 'http://static.haorourou.com/',
    alias: {
        'underscore': 'com/desktop/lib/underscore/underscore-1.6.0.js',
        'widget': 'com/desktop/lib/widget/widget.js',
        'model': 'com/desktop/lib/model/model.js',
        'collection': 'com/desktop/lib/model/collection.js'
    }
};

if (/MSIE/.test(window.navigator.userAgent)) {
    config.alias.$ = 'com/desktop/lib/jquery/jquery-1.11.1.js';
} else {
    config.alias.$ = 'com/desktop/lib/jquery/jquery-2.1.1.js';
}

G.config(config);

if (/\.haorourou\.com$/.test(window.location.host)) {
    document.domain = 'haorourou.com';
}