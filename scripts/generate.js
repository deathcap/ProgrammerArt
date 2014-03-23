var fs = require('fs');
var NodeZip = require('node-zip');
var path = require('path');

var version = '2.2.1-dev';
var root = '../';
var textureRoot = path.join(root, 'textures/');
var outTP = 'ProgrammerArt-TexturePack.zip';
var outRP = 'ProgrammerArt-ResourcePack.zip';
var outSP = 'ProgrammerArt-StitchPack.zip';

var image2tp = require('./texturepack_data.js');
var rpAdded = require('./resourcepack_data.js');
var modpackAs = require('./modpack_data.js');

var zipOpts = {base64:false, compression:'DEFLATE', binary:true};
var fileOpts = {binary:true};

var zipTP = new NodeZip(undefined, undefined, zipOpts);
var zipRP = new NodeZip(undefined, undefined, zipOpts);

var addLicense = function(z) {
  z.file('LICENSE.txt', fs.readFileSync(root + 'LICENSE', 'utf8'), fileOpts);
  z.file('CREDITS.txt', fs.readFileSync(root + 'CREDITS', 'utf8'), fileOpts);
};

addLicense(zipTP);
addLicense(zipRP);

zipRP.file('pack.mcmeta', fs.readFileSync(root + 'pack.mcmeta', 'utf8').replace('SNAPSHOT', version), fileOpts);
zipRP.file('pack.png', new Uint8Array(fs.readFileSync(root + 'pack.png')), fileOpts);
zipTP.file('pack.txt', fs.readFileSync(root + 'pack.txt', 'utf8').replace('SNAPSHOT', version), fileOpts);

processTextures(textureRoot + 'blocks/', 'blocks', 'textures/blocks/', 'assets/minecraft/textures/blocks/');
processTextures(textureRoot + 'items/', 'items', 'textures/items/', 'assets/minecraft/textures/items/');
processSounds();
processAnimations();

fs.writeFileSync(outTP, zipTP.generate(zipOpts), 'binary');
fs.writeFileSync(outRP, zipRP.generate(zipOpts), 'binary');

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

function processSounds() {
  var soundsRoot = path.join(root, 'sounds/');

  // TODO: more sounds. https://github.com/deathcap/ProgrammerArt/issues/1
  zipRP.file('assets/minecraft/sounds/liquid/splash.ogg', new Uint8Array(fs.readFileSync(soundsRoot + '9508_petenice_splash.ogg')), fileOpts);
  zipRP.file('assets/minecraft/sounds/damage/fallsmall.ogg', new Uint8Array(fs.readFileSync(soundsRoot + '44429_thecheeseman_hurt2.ogg')), fileOpts);
  zipRP.file('assets/minecraft/sounds/random/glass1.ogg', new Uint8Array(fs.readFileSync(soundsRoot + '71947_cmusounddesign_bm-glass-break.ogg', fileOpts);
};

function processAnimations() {
  // TODO: more animations. https://github.com/deathcap/ProgrammerArt/issues/10
  // and TODO: list all .mcmeta files on disk, ensure included if expected
  zipRP.file('assets/minecraft/textures/items/compass.png.mcmeta', JSON.stringify({animation: {}}), fileOpts);
  zipRP.file('assets/minecraft/textures/blocks/water_flow.png.mcmeta', JSON.stringify(
        {
          animation: 
          {
            frametime: 10
          }
        }), fileOpts);
};

function processTextures(thisRoot, category, tpPrefix, rpPrefix) {
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

            zipTP.file(pathTP, new Uint8Array(buffer), fileOpts);
        }

        if (rpAdded[category][nameRP] !== undefined) {
            // part of resource pack
            rpAdded[category][nameRP] = true;
            var pathRP = rpPrefix + nameRP + '.png';
            zipRP.file(pathRP, new Uint8Array(buffer), fileOpts);
        } else if (modpackAs[category][nameRP] !== undefined) {
            // part of resource pack for an addon modification; add for each
            var modRenames = modpackAs[category][nameRP];
            for (var j = 0; j < modRenames.length; j += 1) {
              var modRename = modRenames[j];
              var pathRP = 'assets/' + modRename + '.png';

              zipRP.file(pathRP, new Uint8Array(buffer), fileOpts);
            }
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

    var terrainPNG = fs.readFileSync('temp/terrain.png');
    var itemsPNG = fs.readFileSync('temp/items.png');

    console.log(terrainPNG.length);
    console.log(itemsPNG.length);

    var zipSP = new NodeZip(undefined, undefined, zipOpts);
    addLicense(zipSP);
    zipSP.file('terrain.png', new Uint8Array(terrainPNG), fileOpts); // TODO: avoid temp files
    zipSP.file('gui/items.png', new Uint8Array(itemsPNG), fileOpts);
    zipSP.file('stitchpack.json', JSON.stringify(stitchData), fileOpts);
    zipSP.file('pack.txt', fs.readFileSync(root + 'pack.txt', 'utf8').replace('SNAPSHOT', version), fileOpts);
    fs.writeFileSync(outSP, zipSP.generate(zipOpts), 'binary');
  });
});
