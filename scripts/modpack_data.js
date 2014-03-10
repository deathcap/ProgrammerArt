'use strict';

module.exports = {
  'copper_ingot': ['thermalexpansion/items/material/Ingot_Copper', 'ic2/textures/items/resources/itemIngotCopper', 'forestry/textures/items/ingotCopper'],
  'copper_dust': ['thermalexpansion/items/material/DustCopper', 'ic2/textures/items/resources/itemDustCopper'],
  'copper_ore': ['thermalexpansion/blocks/ores/Ore_Copper', 'ic2/textures/blocks/blockOreCopper', 'tinker/textures/blocks/ore_copper', 'forestry/textures/blocks/ores/copper', 'metallurgy/textures/blocks/Base/CopperOre'],
  'copper_block': ['thermalexpansion/blocks/storage/Block_Copper', 'ic2/textures/blocks/blockMetalCopper', 'metallurgy/textures/blocks/Base/CopperBlock'],

  'tin_ingot': ['thermalexpansion/items/material/Ingot_Tin', 'ic2/textures/items/resources/itemIngotTin', 'assets/forestry/textures/items/ingotTin'],
  'tin_dust': ['thermalexpansion/items/material/DustTin', 'ic2/textures/items/resources/itemDustTin', 'tinker/textures/blocks/ore_tin', 'forestry/textures/blocks/ores/tin', 'metallurgy/textures/blocks/Base/TinOre'],
  'tin_ore': ['thermalexpansion/blocks/ores/OreTin', 'ic2/textures/blocks/blockOreTin'],
  'tin_block': ['thermalexpansion/blocks/storage/BlockTin', 'ic2/textures/blocks/blockMetalTin', 'ic2/textures/blocks/blockMetalTin', 'metallurgy/textures/blocks/Base/TinBlock'],
};

var templates = {
  ingot: ['thermalexpansion/items/material/Ingot_<UCFIRST>', 'ic2/textures/items/resources/itemIngot<UCFIRST>', 'forestry/textures/items/ingot<UCFIRST>'],
  dust: ['thermalexpansion/items/material/Dust<UCFIRST>', 'ic2/textures/items/resources/itemDust<UCFIRST>'],
  ore: ['thermalexpansion/blocks/ores/Ore_<UCFIRST>', 'ic2/textures/blocks/blockOre<UCFIRST>', 'tinker/textures/blocks/ore_<LOWER>', 'forestry/textures/blocks/ores/<LOWER>', 'metallurgy/textures/blocks/Base/<UCFIRST>Ore'],
  block: ['thermalexpansion/blocks/storage/Block_<UCFIRST>', 'ic2/textures/blocks/blockMetal<UCFIRST>', 'metallurgy/textures/blocks/Base/<UCFIRST>Block'],
};

var bases = {
  copper: ['ingot', 'dust', 'ore', 'block'],
  tin: ['ingot', 'dust', 'ore', 'block'],
}; 

var ucfirst = function(s) {
    return s.substr(0, 1).toUpperCase() + s.substring(1);
};
/*
var lookupTemplates = function(base, form) {
  for (var key in templates) {
    var keySubst = substituteVariables(key, base);
    if (keySubst ===  // TODO
  }
}*/

var substituteVariables = function(s, value) {
  return s.replace('<LOWER>', value).replace('<UCFIRST>', ucfirst(value));
};

for (var base in bases) {
  bases[base].forEach(function(form) {
    var templateArray = templates[form];
    if (!templateArray) throw new Error('no template found for form '+form+' of '+base);

    templateArray.forEach(function(template) {

      var name = substituteVariables(template, base);

      console.log(name);
    });
  });
}
