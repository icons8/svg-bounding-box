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
      .containDeep({ maxX: 22.808, maxY: 13.76, minX: -2.21, minY: -13.0185, width: 25.018, height: 26.7785 });

    // width 25,018 height 26,7785

  });

});