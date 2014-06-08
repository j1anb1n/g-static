var Widget = require('widget');

module.exports = Widget.define({
    init: function (config) {
        this.config = config;
        this.$pins = [];
        this.reflow();
    },
    setColSize: function (width) {
        this.config.colWidth = width;
    },
    add: function ($pin) {
        var pos = this.getNewPos();

        this.$pins.push($pin);

        $pin.css({
            left: pos.left,
            top: pos.top
        });

        this.config.$el.append($pin);
        this.colHeights[pos.colIndex] += $pin.outerHeight(true);
        this.config.$el.css('height', this.colHeights[this.getMinHeightColIndex()]);
    },
    getNewPos: function () {
        var i = this.getMinHeightColIndex();
        console.log(this.config.colWidth, i, this.config.cols, this.colHeights);
        return {
            left: i * this.config.colWidth,
            top: this.colHeights[i] || 0,
            colIndex: i
        };
    },
    getMinHeightColIndex: function () {
        var self = this;
        return this.colHeights.reduce(function (min, height, index) {
            if (self.colHeights[min] > height) {
                return index;
            } else {
                return min;
            }
        }, 0);
    },
    getMaxHeightColIndex: function () {
        var self = this;
        return this.colHeights.reduce(function (max, height, index) {
            if (self.colHeights[max] < height) {
                return index;
            } else {
                return max;
            }
        }, 0);
    },
    reflow: function (cols) {
        var self = this;
        cols = cols || this.config.cols;
        this.colHeights = [];
        while(cols -- ) {
            this.colHeights.push(0);
        }
        this.$pins.forEach(function ($pin) {
            var pos = self.getNewPos();
            $pin.css({
                left: pos.left,
                top: pos.top
            });
            self.colHeights[pos.colIndex] += $pin.outerHeight(true);
            self.config.$el.css('height', self.colHeights[self.getMinHeightColIndex()]);
        });
    }
});