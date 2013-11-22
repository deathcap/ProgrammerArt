var fs = require('fs');
var AdmZip = require('adm-zip');

var root = 'images';
var out = 'ProgrammerArt-TexturePack.zip';
// translate our image names to texture pack images names
var image2tp = {
    plank_oak: 'wood',
    plank_birch: 'wood_birch',
    plank_spruce: 'wood_spruce',
    plank_jungle: 'wood_jungle',
    log_oak_side: 'tree_side',
    log_oak_top: 'tree_top',
    log_spruce_side: 'tree_spruce',
    log_birch_side: 'tree_birch',
    log_jungle_side: 'tree_jungle',
    door_wood_lower: 'doorWood_lower',
    door_wood_upper: 'doorWood_upper',
    door_iron_lower: 'doorIron_lower',
    door_iron_upper: 'doorIron_upper',
    ladder: 'ladder',
    trapdoor: 'trapdoor',
    dirt: 'dirt',
    farmland_wet: 'farmland_wet',
    farmland_dry: 'farmland_dry',
    grass_dirt_side: 'grass_side',
    grass_side_overlay: 'grass_side_overlay',
    grass_top: 'grass_top',
    grass_tall: 'tallgrass',
    mycelium_top: 'mycel_top',
    mycelium_dirt_side: 'mycel_side',
    leaves_oak: 'leaves',
    leaves_oak_opaque: 'leaves_opaque',
    leaves_spruce: 'leaves_spruce',
    leaves_spruce_opaque: 'leaves_spruce_opaque',
    leaves_jungle: 'leaves_jungle',
    leaves_jungle_opaque: 'leaves_jungle_opaque',
    obsidian: 'obsidian',
    stone_cobble: 'stonebrick', // cobblestone
    stone_cobble_mossy: 'stoneMoss',
    stone_smooth: 'stone',
    stone_bedrock: 'bedrock',
    stone_white: 'whiteStone',
    brick_stone_smooth: 'stonebricksmooth',
    brick_red: 'brick',
    brick_nether: 'netherBrick',
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

    bars_iron: 'fenceIron',

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
    bed_head_top: 'bed_head_top',
    bed_feet_top: 'bed_feet_top',
    bed_head_side: 'bed_head_side',
    bed_feet_side: 'bed_feet_side',
    bed_head_end: 'bed_head_end',
    bed_feet_end: 'bed_feet_end',
    anvil_base: 'anvil_base',
    anvil_top: 'anvil_top',
    anvil_top_damaged_1: 'anvil_top_damaged_1',
    anvil_top_damaged_2: 'anvil_top_damaged_2',
    brewing_stand: 'brewingStand',
    brewing_stand_base: 'brewingStand_base',
    cauldron_bottom: 'cauldron_bottom',
    cauldron_inner: 'cauldron_inner',
    cauldron_side: 'cauldron_side',
    cauldron_top: 'cauldron_top',
    itemframe_back: 'itemframe_back',

    beacon: 'beacon',

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
    flower_pot: 'flowerPot',
    lilypad: 'waterlily',
    sapling_oak: 'sapling',
    sapling_spruce: 'sapling_spruce',
    sapling_birch: 'sapling_birch',
    sapling_jungle: 'sapling_jungle',

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
    cake_top: 'cake_top',
    cake_bottom: 'cake_bottom',
    cake_side: 'cake_side',
    cake_inner: 'cake_inner',
    cocoa_0: 'cocoa_0',
    cocoa_1: 'cocoa_1',
    cocoa_2: 'cocoa_2',
    melon_side: 'melon_side',
    melon_top: 'melon_top',
    mushroom_skin_stem: 'mushroom_skin_stem',
    mushroom_skin_red: 'mushroom_skin_red',
    mushroom_skin_brown: 'mushroom_skin_brown',
    mushroom_inside: 'mushroom_inside',
    mushroom_brown: 'mushroom_brown',
    mushroom_red: 'mushroom_red',
    netherwart_stage_0: 'netherStalk_0',
    netherwart_stage_1: 'netherStalk_1',
    netherwart_stage_2: 'netherStalk_2',
    sugarcane: 'reeds',

    dragon_egg: 'dragonEgg',
    enchantment_bottom: 'enchantment_bottom',
    enchantment_side: 'enchantment_side',
    enchantment_top: 'enchantment_top',
    endframe_eye: 'endframe_eye',
    endframe_side: 'endframe_side',
    endframe_top: 'endframe_top',

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
    redstone_lamp_off: 'redstoneLight',
    redstone_lamp_on: 'redstoneLight_lit',
    comparator_off: 'comparator',
    comparator_on: 'comparator_lit',
    daylight_detector_top: 'daylightDetector_top',
    daylight_detector_side: 'daylightDetector_side',
    lever: 'lever',
    trip_wire: 'tripWire',
    trip_wire_source: 'tripWireSource',
    tnt_bottom: 'tnt_bottom',
    tnt_top: 'tnt_top',
    tnt_side: 'tnt_side',
    hopper: 'hopper',
    hopper_inside: 'hopper_inside',
    hopper_top: 'hopper_top',

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
    jukebox: 'jukebox_top',

    netherrack: 'hellrock',
    ore_nether_quartz: 'netherquartz',
    soulsand: 'hellsand',
    glowstone: 'lightgem',
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

