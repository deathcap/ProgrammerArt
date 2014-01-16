'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

var files = ['../textures/blocks/stone.png', '../textures/blocks/cobblestone.png', '../textures/blocks/gravel.png'];

var tileWidth = 16, tileHeight = 16;
var tileColumns = 2, tileRows = 2;

var stitched = new PNG({width: tileWidth * tileColumns, height: tileHeight * tileRows});

var tileX = 0, tileY  = 0;

var completed = 0;

files.forEach(function(pathFS) {
  console.log('pathFS='+pathFS);
  var png = new PNG();
  png.parse(fs.readFileSync(pathFS));
  png.on('parsed', function() {
    console.log('PARSED '+pathFS+', at '+this.width+'x'+this.height);

    if (this.width !== tileWidth || this.height !== tileHeight)
      throw new Error('unexpected dimensions on '+pathFS+': '+this.width+'x'+this.height+' !== '+tileWidth+'x'+tileHeight);
    
    this.bitblt(stitched, 0, 0, tileWidth, tileHeight, tileX * tileWidth, tileY * tileHeight);

    completed += 1;
    if (completed == files.length) {
      console.log('Writing');
      stitched.pack().pipe(fs.createWriteStream('terrain.png'));
    }

    tileX += 1;
    if (tileX > tileColumns - 1) {
      tileX = 0;
      tileY += 1;
    }
  });
});

