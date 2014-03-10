'use strict';

/*
module.exports = {
  'copper_ingot': ['thermalexpansion/items/material/IngotCopper', 'ic2/textures/items/resources/itemIngotCopper', 'forestry/textures/items/ingotCopper'],
  'copper_dust': ['thermalexpansion/items/material/DustCopper', 'ic2/textures/items/resources/itemDustCopper'],
  'copper_ore': ['thermalexpansion/blocks/ores/OreCopper', 'ic2/textures/blocks/blockOreCopper', 'tinker/textures/blocks/ore_copper', 'forestry/textures/blocks/ores/copper', 'metallurgy/textures/blocks/Base/CopperOre'],
  'copper_block': ['thermalexpansion/blocks/storage/BlockCopper', 'ic2/textures/blocks/blockMetalCopper', 'metallurgy/textures/blocks/Base/CopperBlock'],

  'tin_ingot': ['thermalexpansion/items/material/IngotTin', 'ic2/textures/items/resources/itemIngotTin', 'forestry/textures/items/ingotTin'],
  'tin_dust': ['thermalexpansion/items/material/DustTin', 'ic2/textures/items/resources/itemDustTin'],
  'tin_ore': ['thermalexpansion/blocks/ores/OreTin', 'ic2/textures/blocks/blockOreTin', 'tinker/textures/blocks/ore_tin', 'forestry/textures/blocks/ores/tin', 'metallurgy/textures/blocks/Base/TinOre'],
  'tin_block': ['thermalexpansion/blocks/storage/BlockTin', 'ic2/textures/blocks/blockMetalTin', 'metallurgy/textures/blocks/Base/TinBlock'],
};
*/

var templates = {
  ingot: ['thermalexpansion/items/material/Ingot<UCFIRST>', 'ic2/textures/items/resources/itemIngot<UCFIRST>', 'forestry/textures/items/ingot<UCFIRST>'],
  //TODO dust: ['thermalexpansion/items/material/Dust<UCFIRST>', 'ic2/textures/items/resources/itemDust<UCFIRST>'],
  ore: ['thermalexpansion/blocks/ores/Ore<UCFIRST>', 'ic2/textures/blocks/blockOre<UCFIRST>', 'tinker/textures/blocks/ore_<LOWER>', 'forestry/textures/blocks/ores/<LOWER>', 'metallurgy/textures/blocks/Base/<UCFIRST>Ore'],
  //TODO block: ['thermalexpansion/blocks/storage/Block<UCFIRST>', 'ic2/textures/blocks/blockMetal<UCFIRST>', 'metallurgy/textures/blocks/Base/<UCFIRST>Block'],
};


//var ALL_FORMS = ['ingot', 'dust', 'ore', 'block']; // TODO
var ALL_FORMS = ['ingot', 'ore'];

var bases = {
  copper: ALL_FORMS,
  tin: ALL_FORMS,
}; 

var ucfirst = function(s) {
    return s.substr(0, 1).toUpperCase() + s.substring(1);
};

var substituteVariables = function(s, value) {
  return s.replace('<LOWER>', value).replace('<UCFIRST>', ucfirst(value));
};

var result = {blocks: {}, items: {}};
for (var base in bases) {
  bases[base].forEach(function(form) {
    var ourName = base + '_' + form;
    var theirNames = [];

    var templateArray = templates[form];
    if (!templateArray) throw new Error('no template found for form '+form+' of '+base);

    var isBlock = false;

    theirNames = templateArray.map(function(template) {
      if (template.indexOf('/blocks/') !== -1) isBlock = true;
      return substituteVariables(template, base);
    });

    var category = isBlock ? 'blocks' : 'items';

    result[category][ourName] = theirNames;
  });
}

/*
console.log(JSON.stringify(module.exports,null,'  '));
console.log(JSON.stringify(result,null,'  '));

console.log(JSON.stringify(module.exports) == JSON.stringify(result));
*/

module.exports = result;
console.log(result);
