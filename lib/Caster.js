var
  SvgPathBoundingBox = require('svg-path-bounding-box'),
  SvgSimplify = require('svg-simplify'),
  Cheerio = require('cheerio'),
  BoundingBox = require('./BoundingBox');

module.exports = Caster;

function Caster(data) {
  if (this === global) {
    return new Caster(data).perform();
  }

  this._data = data;
}

Caster.prototype = {

  perform: function() {
    var
      data = this._data;

    return SvgSimplify(data)
      .then(function(content) {
        var
          doc,
          boundingBox;

        boundingBox = new BoundingBox();

        doc = Cheerio.load(content, {
          xmlMode: true,
          decodeEntities: true,
          normalizeWhitespace: true
        });

        doc('path[d]').each(function(index, element) {
          var
            pathBoundingBox,
            stroke;

          element = doc(element);

          pathBoundingBox = new BoundingBox(
            SvgPathBoundingBox(element.attr('d'))
          );

          if (element.attr('stroke') && element.attr('stroke') != 'none') {
            stroke = +element.attr('stroke-width') || 1;
            pathBoundingBox.margin(stroke / 2);
          }

          boundingBox.merge(pathBoundingBox);

        });

        return boundingBox.round();
      });

  }

};