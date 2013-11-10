var fs = require('fs');
var AdmZip = require('adm-zip');

var root = 'images';
var out = 'ProgrammerArt-TexturePack.zip';
// translate our image names to texture pack images names
var image2tp = {
    plank_oak: 'wood',
    log_oak_side: 'tree_side',
    log_oak_top: 'tree_top',
    brick_red: 'brick',
    dirt: 'dirt',
    grass_dirt_side: 'grass_side',
    grass_side_overlay: 'grass_side_overlay',
    grass_top: 'grass_top',
    grass_tall: 'tallgrass',
    leaves_oak: 'leaves',
    leaves_oak_opaque: 'leaves_opaque',
    obsidian: 'obsidian',
    stone_cobble: 'stonebrick', // cobblestone
    stone_smooth: 'stone',
    brick_stone_smooth: 'stonebricksmooth',

    glass: 'glass',
    glass_thin_top: 'thinglass_top',

    wool_white: 'cloth_0',
    wool_orange: 'cloth_1',
    wool_magenta: 'cloth_2',
    wool_lightblue: 'cloth_3',
    wool_yellow: 'cloth_4',
    wool_lime: 'cloth_5',
    wool_pink: 'cloth_6',
    wool_gray: 'cloth_7',
    wool_lightgray: 'cloth_8',
    wool_cyan: 'cloth_9',
    wool_purple: 'cloth_10',
    wool_blue: 'cloth_11',
    wool_brown: 'cloth_12',
    wool_green: 'cloth_13',
    wool_red: 'cloth_14',
    wool_black: 'cloth_15'
};

fs.readdir(root, function(err, files) {
    console.log("files = " + files);
    
    var zip = new AdmZip();

    zip.addFile('textures/', new Buffer(0));
    zip.addFile('textures/blocks/', new Buffer(0));

    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        var key = file.replace('.png', ''); // TODO: split extension
        var name = image2tp[key];
        if (name === undefined) {
            console.log('FAILED to add ' + file + ' - no name for ' + key);
            continue;
        }

        var path = 'textures/blocks/' + name + '.png';

        console.log('Adding ' + file + ' as ' + path);

        buffer = fs.readFileSync(root + '/' + file);
        zip.addFile(path, buffer);
    }

    zip.writeZip(out);

    console.log("Wrote " + out);
});

