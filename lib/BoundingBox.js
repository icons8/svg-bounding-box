
module.exports = BoundingBox;

function BoundingBox(boundingBox) {

  boundingBox = boundingBox || {};

  this.minX = parse(boundingBox.minX);
  this.minY = parse(boundingBox.minY);
  this.maxX = parse(boundingBox.maxX);
  this.maxY = parse(boundingBox.maxY);

  function parse(value) {
    value = +value;
    return typeof value == 'number'
      ? value
      : NaN;
  }
}

BoundingBox.prototype = {

  width: function() {
    return this.maxX - this.minX;
  },

  height: function() {
    return this.maxY - this.minY;
  },

  outline: function(value) {
    value = Math.abs(+value || 0);

    this.minX -= value;
    this.minY -= value;

    this.maxX += value;
    this.maxY += value;

    return this;
  },

  merge: function(boundingBox) {

    function min(a, b) {
      return a > b
        ? b
        : a;
    }

    function max(a, b) {
      return a < b
        ? b
        : a;
    }

    this.minX = min(boundingBox.minX, this.minX);
    this.minY = min(boundingBox.minY, this.minY);

    this.maxX = max(boundingBox.maxX, this.maxX);
    this.maxY = max(boundingBox.maxY, this.maxY);

    return this;
  }

};