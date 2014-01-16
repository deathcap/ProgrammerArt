var fs = require('fs');
var AdmZip = require('adm-zip');
var path = require('path');

var version = '2.0';
var root = '../';
var textureRoot = path.join(root, 'textures/');
var outTP = 'ProgrammerArt-TexturePack.zip';
var outRP = 'ProgrammerArt-ResourcePack.zip';
var outSP = 'ProgrammerArt-StitchPack.zip';

var image2tp = require('./texturepack_data.js');
var rpAdded = require('./resourcepack_data.js');

var zipTP = new AdmZip();
var zipRP = new AdmZip();

zipRP.addFile('pack.mcmeta', fs.readFileSync(root + 'pack.mcmeta', 'utf8').replace('SNAPSHOT', version));
zipTP.addFile('pack.txt', fs.readFileSync(root + 'pack.txt', 'utf8').replace('SNAPSHOT', version));

process(textureRoot + 'blocks/', 'blocks', 'textures/blocks/', 'assets/minecraft/textures/blocks/');
process(textureRoot + 'items/', 'items', 'textures/items/', 'assets/minecraft/textures/items/');

zipTP.writeZip(outTP);
zipRP.writeZip(outRP);

console.log("Wrote " + outTP);
console.log("Wrote " + outRP);

Object.keys(rpAdded).forEach(function(category) {
    var total = 0, missing = 0;
    for (var x in rpAdded[category]) {
        ++total;
        if (rpAdded[category][x]) continue;
        if (x.indexOf("_overlay") !== -1) continue; // skip for now
        console.log("Missing "+x);
        ++missing;
    }
    console.log(category + ': ' + (total - missing) + " / " + total + " = " + (total - missing) / total);
});

function process(thisRoot, category, tpPrefix, rpPrefix) {
    var files = fs.readdirSync(thisRoot);

    console.log("files = " + files);
    
    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        var buffer = fs.readFileSync(thisRoot + '/' + file);

        var nameRP = file.replace('.png', '');
        var nameTP = image2tp[category][nameRP];

        if (nameTP !== undefined) {
            // part of texture pack
            var pathTP = tpPrefix + nameTP + '.png';

            zipTP.addFile(pathTP, buffer);
        }

        if (rpAdded[category][nameRP] !== undefined) {
            // part of resource pack
            rpAdded[category][nameRP] = true;
            var pathRP = rpPrefix + nameRP + '.png';
            zipRP.addFile(pathRP, buffer);
        } else {
            console.log("Unknown file: " + file);
        }
    }
}

var stitchMatrices = require('./stitchpack_data.js');
var stitch = require('./stitcher.js');

var stitchData = {name:'ProgrammerArt v'+version, tileWidth:tileWidth, tileHeight:tileHeight, coords: {blocks: {}, items: {}}};
var tileWidth = 16, tileHeight = 16;

stitch('temp/terrain.png', root + 'textures/blocks/', stitchMatrices.terrain, tileWidth, tileHeight, function(name2Coord) {
  stitchData.coords.blocks = name2Coord;

  stitch('temp/items.png', root + 'textures/items/', stitchMatrices.items, tileWidth, tileHeight, function(name2Coord) {
    stitchData.coords.items = name2Coord;
    console.log('Writing',outSP);

    console.log(fs.readFileSync('temp/terrain.png').length);
    console.log(fs.readFileSync('temp/items.png').length);

    var zipSP = new AdmZip();
    zipSP.addLocalFile('temp/terrain.png', 'terrain.png'); // TODO: avoid temp files
    zipSP.addLocalFile('temp/items.png', 'gui/items.png');
    zipSP.addFile('stitchpack.json', JSON.stringify(stitchData));
    zipSP.addFile('pack.txt', fs.readFileSync(root + 'pack.txt', 'utf8').replace('SNAPSHOT', version));
    zipSP.writeZip(outSP);
  });
});
