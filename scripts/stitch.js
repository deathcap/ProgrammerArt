'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

var files = ['../textures/blocks/stone.png', '../textures/blocks/cobblestone.png', '../textures/blocks/gravel.png'];

var tileWidth = 16, tileHeight = 16;
var tileRows = 3, tileColumns = 1;

var stitched = new PNG({width: tileWidth * tileRows, height: tileHeight * tileColumns, filterType:4});

var tileX = 0, tileY  = 0;

files.forEach(function(pathFS) {
  console.log('pathFS='+pathFS);
  var png = new PNG();
  png.parse(fs.readFileSync(pathFS));

  console.log('PARSED '+pathFS+', at '+png.width+'x'+png.height);

  if (png.width !== tileWidth || png.height !== tileHeight)
    throw new Error('unexpected dimensions on '+pathFS+': '+png.width+'x'+png.height+' !== '+tileWidth+'x'+tileHeight);

  //png.bitblt(stitched, 0, 0, tileWidth, tileHeight, tileX * tileWidth, tileY * tileHeight);

  for (var x = 0; x < png.width; ++x) {
    for (var y = 0; y < png.height; ++y) {
      var idx = (png.width * y + x) << 2;

      var idxS = idx;

      for (var c = 0; c < 4; ++c) {
        stitched.data[idxS + c] = png[idx + c];
        console.log(' data '+x+','+y+','+c+' = '+png.data[idx+c]);
      }
    }
  }


  tileX  += 1;
  //if (x > ) y += 1;
});

stitched.pack().pipe(fs.createWriteStream('terrain.png'));
