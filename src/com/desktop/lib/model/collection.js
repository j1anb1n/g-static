var $ = require('$');

function Collection (config) {
    this.Model = config.Model;
    this._models = [];
}

Collection.prototype.fetch = function (query, callback) {
    var self = this;
    var url = this.config.url;
    url += this.config.url.indexOf('?') === -1 ? '?' : '&';
    url += $.param(query);

    $.getJSON(this.config.url)
        .done(function (data) {
            var err;
            if (data && (data.result || data.error)) {
                if (data.result) {
                    if (!Array.isArray(data.result)) {
                        data.result = [data.result];
                    }
                    try {
                        data.result.forEach(function (row) {
                            self.push(new self.Model(row));
                        });
                    } catch (ex) {
                        err = new Error('Internal error');
                        err.code = -32603;
                        callback(err);
                        return;
                    }

                    callback(null, data.result);
                } else if (data.error) {
                    err = new Error(data.error.message);
                    err.code = data.error.code;
                    callback(err);
                }
            } else {
                err = new Error('Parse error');
                err.code = -32700;

                callback(err);
            }
        })
        .fail(function () {
            var err = new Error('Internal error');
            err.code = -32603;
            callback(err);
        });
};

Collection.prototype.push = function (model) {
    this._models.push(model);
};

Collection.prototype.toJSON = function () {
    return this._models.map(function (model) {
        return  model.toJSON();
    });
};

module.exports = Collection;