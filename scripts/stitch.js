var PNG = require('pngjs').PNG;
var fs = require('fs');

var files = ['../textures/blocks/stone.png', '../textures/blocks/cobblestone.png', '../textures/blocks/gravel.png'];

var tileWidth = 16, tileHeight = 16;
var tileRows = 3, tileColumns = 1;

var stitched = new PNG({width: tileWidth * tileRows, height: tileHeight * tileColumns});

var x = 0, y = 0;

files.forEach(function(pathFS) {
  console.log('pathFS='+pathFS);
  fs.createReadStream(pathFS)
    .pipe(new PNG({}))
    .on('parsed', function() {
      console.log('PARSED '+pathFS+', at '+this.width+'x'+this.height);

      if (this.width !== tileWidth || this.height !== tileHeight)
        throw new Error('unexpected dimensions on '+pathFS+': '+this.width+'x'+this.height+' !== '+tileWidth+'x'+tileHeight);

      this.bitblt(stitched, 0, 0, tileWidth, tileHeight, x * tileWidth, y * tileHeight);

      x += 1;
      //if (x > ) y += 1;
    });
});

stitched.pack().pipe(fs.createWriteStream('terrain.png'));

