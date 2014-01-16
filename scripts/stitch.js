'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

var files = ['../textures/blocks/stone.png', '../textures/blocks/cobblestone.png', '../textures/blocks/gravel.png'];

var tileWidth = 16, tileHeight = 16;
var tileRows = 4, tileColumns = 1;

var stitched = new PNG({width: tileWidth * tileRows, height: tileHeight * tileColumns});

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

    /*
    for (var x = 0; x < this.width; x += 1) {
      for (var y = 0; y < this.height; y += 1) {
        var idx = (this.width * y + x) << 2;

        var idxS = (stitched.width * y + x) << 2;

        for (var c = 0; c < 4; ++c) {
          stitched.data[idxS + c] = tileX * 50; //png[idx + c];
          //console.log(' data '+x+','+y+','+c+' = '+this.data[idx+c]);
        }
      }
    }
    */

    completed += 1;
    if (completed == files.length) {
      console.log('Writing');
      stitched.pack().pipe(fs.createWriteStream('terrain.png'));
    }
  });


  tileX += 1;
  //if (x > ) y += 1;
});

