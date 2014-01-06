
// package file to return texture path for use with NPM - based on https://github.com/dariusk/painterly-textures
var path = require('path');
var texturePath = __dirname + '/textures'; // TODO: but what if we add sounds? https://github.com/deathcap/ProgrammerArt/issues/1

module.exports = function(dir) {
  return path.relative(dir, texturePath) + '/';
};
