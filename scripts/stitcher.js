'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

var coverArea = function(h, w, cb) {
  for (var y = 0; y < h; y += 1) {
    for (var x = 0; x < w; x += 1) {
      cb(x, y);
    }
  }
};

var stitch = function(outFile, pathPrefix, matrix, tileWidth, tileHeight, cb) {
  var tileColumns = matrix[0].length, tileRows = matrix.length;
  var matrixSize = tileColumns * tileRows;
  var stitched = new PNG({width: tileWidth * tileColumns, height: tileHeight * tileRows});
  var tileX = 0, tileY  = 0;
  var completed = 0;

  var name2Coord = {};

  coverArea(tileRows, tileColumns, function(tileX, tileY) {
    var name = matrix[tileY][tileX];

    if (!name) {
      completed += 1; // TODO: write empty instead
      return;
    }

    var pathFS = pathPrefix + name + '.png';

    var png = new PNG();
    try {
      png.parse(fs.readFileSync(pathFS));
    } catch (e) {
      console.log('skipping '+pathFS);
      completed += 1;
      return;
    }

    if (!name2Coord[name]) // don't overwrite
      name2Coord[name] = [tileX, tileY];

    png.on('parsed', function() {
      if (this.width !== tileWidth || this.height !== tileHeight)
        throw new Error('unexpected dimensions on '+pathFS+': '+this.width+'x'+this.height+' !== '+tileWidth+'x'+tileHeight);
     
      this.bitblt(stitched, 0, 0, tileWidth, tileHeight, tileX * tileWidth, tileY * tileHeight);

      completed += 1;
      if (completed == matrixSize) {
        console.log('Writing',outFile);
        var w = fs.createWriteStream(outFile);
        stitched.pack().pipe(w);
        w.on('finish', function() {
          cb(name2Coord);
        });
      }
    });
  });
};

module.exports = stitch;


