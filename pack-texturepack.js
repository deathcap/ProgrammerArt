var fs = require('fs');
var AdmZip = require('adm-zip');

var root = 'images';
var out = 'ProgrammerArt-TexturePack.zip';
// translate our image names to texture pack images names
var image2tp = {
    plank_oak: 'wood',
    log_oak_side: 'tree_side',
    log_oak_top: 'tree_top',
    log_spruce_side: 'tree_spruce',
    log_birch_side: 'tree_birch',
    log_jungle_side: 'tree_jungle',
    brick_red: 'brick',
    dirt: 'dirt',
    farmland_wet: 'farmland_wet',
    farmland_dry: 'farmland_dry',
    grass_dirt_side: 'grass_side',
    grass_side_overlay: 'grass_side_overlay',
    grass_top: 'grass_top',
    grass_tall: 'tallgrass',
    leaves_oak: 'leaves',
    leaves_oak_opaque: 'leaves_opaque',
    obsidian: 'obsidian',
    stone_cobble: 'stonebrick', // cobblestone
    stone_cobble_mossy: 'stoneMoss',
    stone_smooth: 'stone',
    stone_bedrock: 'bedrock',
    stone_white: 'whiteStone',
    brick_stone_smooth: 'stonebricksmooth',
    gravel: 'gravel',
    sand: 'sand',
    stone_sandstone_top: 'sandstone_top',
    stone_sandstone_side: 'sandstone_side',
    clay: 'clay',
    snow: 'snow',

    ore_gold: 'oreGold',
    ore_coal: 'oreCoal',
    ore_redstone: 'oreRedstone',
    ore_iron: 'oreIron',
    ore_lapis_lazuli: 'oreLapis',
    ore_emerald: 'oreEmerald',
    ore_diamond: 'oreDiamond',

    block_gold: 'blockGold',
    block_diamond: 'blockDiamond',
    block_emerald: 'blockEmerald',
    block_iron: 'blockIron',
    block_redstone: 'blockRedstone',
    block_lapis_lazuli: 'blockLapis',

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
    wool_black: 'cloth_15',

    rail_straight: 'rail',
    rail_turn: 'rail_turn',
    rail_detector: 'detectorRail',
    rail_activator_off: 'activatorRail',
    rail_activator_on: 'activatorRail_powered',
    rail_powered_off: 'goldenRail',
    rail_powered_on: 'goldenRail_powered',

    cobweb: 'web',
    plant_dandelion: 'flower',
    plant_rose: 'rose',
    plant_dead: 'deadbush',
    plant_fern: 'fern',
    lilypad: 'waterlily',

    crops_0: 'crops_0',
    crops_1: 'crops_1',
    crops_2: 'crops_2',
    crops_3: 'crops_3',
    crops_4: 'crops_4',
    crops_5: 'crops_5',
    crops_6: 'crops_6',
    crops_7: 'crops_7',
    carrots_0: 'carrots_0',
    carrots_1: 'carrots_1',
    carrots_2: 'carrots_2',
    carrots_3: 'carrots_3',
    cactus_side: 'cactus_side',
    cactus_bottom: 'cactus_bottom',
    cactus_top: 'cactus_top',

    destroy_0: 'destroy_0',
    destroy_1: 'destroy_1',
    destroy_2: 'destroy_2',
    destroy_3: 'destroy_3',
    destroy_4: 'destroy_4',
    destroy_5: 'destroy_5',
    destroy_6: 'destroy_6',
    destroy_7: 'destroy_7',
    destroy_8: 'destroy_8',
    destroy_9: 'destroy_9',

    monster_spawner: 'mobSpawner',

    torch: 'torch',
    torch_redstone_off: 'redtorch',
    torch_redstone_on: 'redtorch_lit',
    redstone_dust_line: 'redstoneDust_line',
    redstone_dust_cross: 'redstoneDust_cross',
    comparator_off: 'comparator',
    comparator_on: 'comparator_lit',
    daylight_detector_top: 'daylightDetector_top',
    daylight_detector_side: 'daylightDetector_side',

    sponge: 'sponge',
    vine: 'vine',

    furnace_front_off: 'furnace_front',
    furnace_front_on: 'furnace_front_lit',
    furnace_side: 'furnace_side',
    furnace_top: 'furnace_top',
    dispenser_front: 'dispenser_front',
    dispenser_vertical_front: 'dispenser_front_vertical',
    dropper_front: 'dropper_front',
    dropper_vertical_front: 'dropper_front_vertical',

    crafting_table_side: 'workbench_side',
    crafting_table_top: 'workbench_top',
    crafting_table_front: 'workbench_front',
    command_block: 'commandBlock',
    bookshelf: 'bookshelf',
    note_block: 'musicBlock',
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

