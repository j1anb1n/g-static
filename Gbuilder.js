var Builder = require('g-builder');
var builder = module.exports = new Builder(require('./config'));

builder.registerBuilder('com/g/*.js')
        .copy();

builder.registerBuilder('com/desktop/g.js')
        .src()
        .concat()
        // .uglify()
        .dest();

builder.registerBuilder('**/*.less')
        .src()
        .pipe(require('g-builder/builders/less'))
        // .pipe(require('g-builder/builders/css').minify)
        .pipe(require('g-builder/builders/less').writeAsCss)
        .dest();

builder.registerBuilder('**/*.css')
        .src()
        .pipe(require('g-builder/builders/css'))
        // .pipe(require('g-builder/builders/css').minify)
        .dest();

builder.registerBuilder('com/mobile/lib/zepto/zepto.cmb.js')
        .src()
        .concat()
        .pipe(require('g-builder/builders/amd'))
        // .uglify()
        .dest();

builder.registerBuilder('**/*.cmb.js')
        .src()
        .pipe(require('g-builder/builders/amd').combine)
        // .uglify()
        .dest();

builder.registerBuilder('**/*.js')
        .src()
        .jshint()
        .pipe(require('g-builder/builders/amd'))
        // .uglify()
        .dest();

builder.registerBuilder('**/*.tpl')
        .src()
        .pipe(require('./builder/template.js'))
        .pipe(require('g-builder/builders/amd'))
        // .uglify()
        .dest();

builder.registerBuilder('**/*.appcache')
        .src()
        .pipe(require('./builder/manifest.js'))
        .dest();

builder.registerDefaultBuilder()
        .copy();
