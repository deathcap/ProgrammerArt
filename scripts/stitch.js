'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

var terrainMatrix = [
  ['grass_top', 'stone', 'dirt', 'grass_side', 'planks_oak', 'stone_slab_side', 'stone_slab_top', 'brick', 
  'tnt_side', 'tnt_top', 'tnt_bottom', 'web', 'flower_rose', 'flower_dandelion', 'portal', 'sapling_oak'],

  ['cobblestone', 'bedrock', 'sand', 'gravel', 'log_oak', 'log_oak_top', 'iron_block', 'gold_block', 
  'diamond_block', 'emerald_block', null, null, 'mushroom_red', 'mushroom_brown', 'sapling_jungle', 'fire_layer_0'],

  ['gold_ore', 'iron_ore', 'coal_ore', 'bookshelf', 'cobblestone_mossy', 'obsidian', 'grass_side', 'tallgrass', 
  'grass_top', 'beacon', null, 'crafting_table_top', 'furnace_front_off', 'furnace_side', 'dispenser_front_horizontal', 'fire_layer_1'],

  ['sponge', 'glass', 'diamond_ore', 'redstone_ore', 'leaves_oak', 'leaves_oak_opaque', 'stonebrick', 'deadbush', 
  'fern', null, null, 'crafting_table_side', 'crafting_table_front', 'furnace_front_on', 'furnace_top', 'sapling_spruce'],

  ['wool_colored_white', null/*spawner*/, 'snow', 'ice', 'grass_side_snowed', 'cactus_top', 'cactus_side', 'cactus_bottom',
  'clay', 'reeds', 'jukebox_side', 'jukebox_top', 'waterlily', 'mycelium_side', 'mycelium_top', 'sapling_birch'],

  ['torch_on', 'door_wood_upper', 'door_iron_upper', 'ladder', 'trapdoor', 'iron_bars', 'farmland_wet', 'farmland_dry', 
  'wheat_stage_0', 'wheat_stage_1', 'wheat_stage_2', 'wheat_stage_3', 'wheat_stage_4', 'wheat_stage_5', 'wheat_stage_6', 'wheat_stage_7'],

  ['lever', 'door_wood_lower', 'door_iron_lower', 'redstone_torch_on', 'stonebrick_mossy', 'stonebrick_cracked', 'pumpkin_top', 'netherrack',
  'soul_sand', 'glowstone', 'piston_top_sticky', 'piston_top_normal', 'piston_side', 'piston_bottom', 'piston_inner', 'melon_stem_disconnected'],

  ['rail_normal_turned', 'wool_colored_black', 'wool_colored_gray', 'redstone_torch_off', 'log_spruce', 'log_birch', 'pumpkin_side', 'pumpkin_face_off',
  'pumpkin_face_on', 'cake_top', 'cake_side', 'cake_inner', 'cake_bottom', 'mushroom_block_skin_red', 'mushroom_block_skin_brown', 'melon_stem_connected'],

  ['rail_normal', 'wool_colored_red', 'wool_colored_pink', 'repeater_off', 'leaves_spruce', 'leaves_spruce_opaque', 'bed_feet_top', 'bed_head_side', 
  'melon_side', 'melon_top', 'cauldron_top', 'cauldron_inner', 'cake_top', 'mushroom_block_skin_stem', 'mushroom_block_inside', 'vine'],

  ['lapis_block', 'wool_colored_green', 'wool_colored_lime', 'repeater_on', 'glass_pane_top', 'bed_feet_end', 'bed_feet_side', 'bed_head_side',
  'bed_head_end', 'log_jungle', 'cauldron_side', 'cauldron_bottom', 'brewing_stand_base', 'brewing_stand', 'endframe_top', 'endframe_side'],

  ['lapis_ore', 'wool_colored_brown', 'wool_colored_yellow', 'rail_golden', 'redstone_dust_line', 'redstone_dust_line', 'enchanting_table_top',
  'dragon_egg', 'cocoa_stage_2', 'cocoa_stage_1', 'cocoa_stage_0', 'emerald_ore', 'trip_wire_source', 'trip_wire', 'endframe_eye', 'end_stone'],

  ['sandstone_top', 'wool_colored_blue', 'wool_colored_light_blue', 'rail_golden_powered', 'redstone_dust_line_overlay', 'redstone_dust_cross_overlay', 'enchanting_table_side', 'enchanting_table_bottom',
  'command_block', 'itemframe_background', 'flower_pot', null, null, null, null, null],

  ['sandstone_normal', 'wool_colored_purple', 'wool_colored_magenta', 'rail_detector', 'leaves_jungle', 'leaves_jungle_opaque', 'planks_spruce', 'planks_jungle',
  'carrots_stage_0', 'carrots_stage_1', 'carrots_stage_2', 'carrots_stage_3', 'potatoes_stage_3', 'water_flow', 'water_flow', 'water_flow'],

  ['sandstone_bottom', 'wool_colored_cyan', 'wool_colored_orange', 'redstone_lamp_off', 'redstone_lamp_on', 'stonebrick_carved', 'planks_birch', 'anvil_base', 
  'anvil_top_damaged_1', null, null, null, null, null, 'water_flow', 'water_flow'],

  ['nether_brick', 'wool_colored_silver', 'nether_wart_stage_0', 'nether_wart_stage_1', 'nether_wart_stage_2', 'sandstone_carved', 'sandstone_smooth', 'anvil_top_damaged_0',
  'anvil_top_damaged_2', null, null, null, null, 'lava_flow', 'lava_flow', 'lava_flow'],

  ['destroy_stage_0', 'destroy_stage_1', 'destroy_stage_2', 'destroy_stage_3', 'destroy_stage_4', 'destroy_stage_5', 'destroy_stage_6', 'destroy_stage_7',
  'destroy_stage_8', 'destroy_stage_9', null, null, null, null, 'lava_flow', 'lava_flow']
];

var matrix = terrainMatrix;

var tileWidth = 16, tileHeight = 16;
var tileColumns = matrix[0].length, tileRows = matrix.length;
var matrixSize = tileColumns * tileRows;

var stitched = new PNG({width: tileWidth * tileColumns, height: tileHeight * tileRows});

var tileX = 0, tileY  = 0;

var completed = 0;

var coverArea = function(h, w, cb) {
  for (var y = 0; y < h; y += 1) {
    for (var x = 0; x < w; x += 1) {
      cb(x, y);
    }
  }
};

coverArea(tileRows, tileColumns, function(tileX, tileY) {
  var name = matrix[tileY][tileX];

  if (!name) {
    completed += 1; // TODO: write empty instead
    return;
  }

  var pathFS = '../textures/blocks/' + name + '.png';

  console.log('pathFS='+pathFS);
  var png = new PNG();
  png.parse(fs.readFileSync(pathFS));

  png.on('parsed', function() {
    console.log('PARSED '+pathFS+', at '+this.width+'x'+this.height);

    if (this.width !== tileWidth || this.height !== tileHeight)
      throw new Error('unexpected dimensions on '+pathFS+': '+this.width+'x'+this.height+' !== '+tileWidth+'x'+tileHeight);
   
    console.log(tileX, tileY);
    this.bitblt(stitched, 0, 0, tileWidth, tileHeight, tileX * tileWidth, tileY * tileHeight);

    completed += 1;
    if (completed == matrixSize) {
      console.log('Writing',completed,' ',matrixSize);
      stitched.pack().pipe(fs.createWriteStream('terrain.png'));
    }
  });
});
