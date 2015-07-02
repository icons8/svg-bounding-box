var
  should = require('should-promised'),
  Caster = require('..')
  ;

describe('svg-path-bounding-box', function () {


  it('should work', function() {

    Caster(
      '<g transform="skewY(2)"><g transform="scale(1.1,-1.2) skewX(1)" stroke-width="2" stroke="red"><ellipse rx="1.1" ry=".1e2" transform="rotate(1)" /><path d="M0,0 L20,-10" stroke="yellow" stroke-width="1"/><path d="M0,0 L20-10" stroke="green"/><path d="M0,0 L20-10" stroke="black"/></g></g>'
    )
      .should
      .finally
      .containDeep({ maxX: 21.808, maxY: 12.76, minX: -1.21, minY: -12.0185, width: 23.018, height: 24.7785 });

  });

});