var async = require('async');
var minimatch = require('minimatch');

module.exports = function (callback) {
    var fileInfo = this.file;
    var manifest = JSON.parse(fileInfo.content);
    var content = 'CACHE MANIFEST\n';
    var baseUrl = manifest.baseUrl || '';
    var db = this.db;
    content += '# ' + (new Date()).toString() + '\n';

    fileInfo.deps = manifest.cache || [];

    if (manifest.fallback) {
        content += 'FALLBACK:\n';
        content += manifest.fallback.join('\n');
        content += '\n\n';
    }

    if (manifest.network) {
        content += 'NETWORK:\n';
        content += manifest.network.join('\n');
        content += '\n\n';
    }

    if (manifest.cache) {
        async.reduce(
            manifest.cache,
            'CACHE:\n',
            function (cache, pattern, next) {
                db.find({}, function (err, docs) {
                    docs
                        .forEach(function (doc) {
                            if (doc.filename === fileInfo.id) {
                                return;
                            }

                            if (minimatch(doc.filename, pattern)) {
                                cache += baseUrl + doc.filename + '\n';
                            }
                        });

                    next(err, cache);
                });
            },
            function (err, cache) {
                content += cache;
                fileInfo.content = content;
                callback(null);
            }
        );
    } else {
        fileInfo.content = content;
        callback(null);
    }
};