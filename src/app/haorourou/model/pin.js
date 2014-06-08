// var Model = require('model');
// var Collection = require('collection');

// exports.Model = Model.define({
//     fields: {
//         'id': [],
//         'isLike': [],
//         'img_url': [],
//         'detail_url': [],
//         'description': [],
//         'like_count': [],
//         'avatar': [],
//         'author': [],
//         'date': []
//     }
// });

// exports.Collection = new Collection({
//     model:
// })

var data = [1,2,3,4,5,6,7,8,9,10].map(function (id) {
    var width = parseInt(Math.random() * 5000);
    var height = parseInt(width * (Math.random() + 0.25) * 2);
    var date = new Date(parseInt(Math.random() * Date.now()));

    return {
        id: id,
        isLike: parseInt(Math.random() * 2) > 1,
        img_url: 'holder.js/100%x' + parseInt(270 * height / width) + '/#a2e0af:#81b38c/text:Pin',
        detail_url: '#',
        description: '这是描述',
        like_count: parseInt(Math.random() * 1000),
        height: height,
        width: width,
        username: 'username',
        avatar: 'holder.js/45x45/text: Avatar',
        date: [date.getYear(), date.getMonth(), date.getDate()].join('-')
    };
});

exports.fetch = function (query, callback) {
    callback(null, data.map(function (row) {
        return {
            toJSON: function () {
                return row;
            }
        };
    }));
};