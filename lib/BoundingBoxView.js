
module.exports = BoundingBoxView;

function BoundingBoxView(boundingBox) {

  this.x1 = this.minX = boundingBox.minX || 0;
  this.y1 = this.minY = boundingBox.minY || 0;
  this.x2 = this.maxX = boundingBox.maxX || 0;
  this.y2 = this.maxY = boundingBox.maxY || 0;
  this.width = boundingBox.width() || 0;
  this.height = boundingBox.height() || 0;

}

BoundingBoxView.prototype = {

  round: function(precision) {
    precision = precision || 5;

    this.x1 = this.minX = +this.x1.toFixed(precision);
    this.y1 = this.minY = +this.y1.toFixed(precision);
    this.x2 = this.maxX = +this.x2.toFixed(precision);
    this.y2 = this.maxY = +this.y2.toFixed(precision);
    this.width = +this.width.toFixed(precision);
    this.height = +this.height.toFixed(precision);

    return this;
  },

  toString: function() {
    return [
      this.minX,
      this.minY,
      this.width,
      this.height
    ]
      .join(' ');
  }

};