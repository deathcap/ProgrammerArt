ProgrammerArt
=============

Original textures designed for voxel games, freely released for any use.

## Screenshot

![screenshot](http://i.imgur.com/bmm7HK4.png "Screenshot")

## Releases

While the textures can be used standalone or for other purposes, a Node.js script is included to
bundle up a [Minecraft](https://minecraft.net/) resource pack and/or texture pack archive. See the 
tagged [releases](https://github.com/deathcap/ProgrammerArt/releases)
for all generated packs. ResourcePacks are for MC 1.7+, 1.6, TexturePacks for MC 1.5,
and StitchPacks for MC 1.4.

Available on NPM for easily using with [voxeljs](http://voxeljs.com/), example:

    var texturePath = require('programmerart-textures')('');
    var createGame = require('voxel-engine');

    var game = createGame({
        texturePath: texturePath,
        materials: [
            ['blocks/grass_top', 'blocks/dirt', 'blocks/grass_side'],
            'blocks/stone',
            'blocks/dirt']
        });


ProgrammerArt also has a [thread on Minecraft Forums](http://www.minecraftforum.net/topic/2145418-).


## License

Creative Commons Zero 1.0 Universal Public Domain Dedication


