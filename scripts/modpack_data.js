'use strict';

var templates = {
  ingot: ['thermalexpansion/items/material/Ingot<UCFIRST>', 'ic2/textures/items/resources/itemIngot<UCFIRST>', 'tinker/textures/items/materials/material_<LOWER>ingot', 'forestry/textures/items/ingot<UCFIRST>'],
  dust: ['thermalexpansion/items/material/Dust<UCFIRST>', 'ic2/textures/items/resources/itemDust<UCFIRST>'],
  ore: ['thermalexpansion/blocks/ores/Ore<UCFIRST>', 'ic2/textures/blocks/blockOre<UCFIRST>', 'tinker/textures/blocks/ore_<LOWER>', 'forestry/textures/blocks/ores/<LOWER>', 'metallurgy/textures/blocks/Base/<UCFIRST>Ore'],
  block: ['thermalexpansion/blocks/storage/Block<UCFIRST>', 'ic2/textures/blocks/blockMetal<UCFIRST>', 'tinker/textures/blocks/compressed_<LOWER>', 'metallurgy/textures/blocks/Base/<UCFIRST>Block'],
};


var ALL_FORMS = ['ingot', 'dust', 'ore', 'block'];

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

module.exports = result;
console.log(result);
