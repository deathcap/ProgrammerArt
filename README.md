ProgrammerArt
=============

Original textures designed for voxel games, freely released for any use.

## Screenshot

![screenshot](http://i.imgur.com/bmm7HK4.png "Screenshot")

## Releases

While the textures can be used standalone or for other purposes, a Node.js script is included to
bundle up zip archives into packs compatible with [Minecraft](https://minecraft.net/) and other
games. The following formats are supported:

* ResourcePack: for MC 1.7+, 1.6, paths begin with `assets`
* TexturePacks: for MC 1.5, similar but without assets prefix and different filenames
* StitchPack: for MC 1.4 and earlier, pre-stitched texture atlases

ProgrammerArt is available to download from:

* **[GitHub tagged releases](https://github.com/deathcap/ProgrammerArt/releases)**
* [Curse client](http://www.curse.com/search?type=texture-packs&search=programmerart)
* [Dropbox](https://github.com/deathcap/ProgrammerArt/issues/9#issuecomment-33195856) 
* [NodeJS Package Manager (NPM)](https://npmjs.org/package/programmerart-textures), for easily using with using with [voxeljs](http://voxeljs.com/), example:

    var texturePath = require('programmerart-textures')('');
    var createGame = require('voxel-engine');

    var game = createGame({
        texturePath: texturePath,
        materials: [
            ['blocks/grass_top', 'blocks/dirt', 'blocks/grass_side'],
            'blocks/stone',
            'blocks/dirt']
        });

(alternatively, the [artpacks](https://github.com/deathcap/artpacks) module can load ResourcePack zips directly)


ProgrammerArt also has a [thread on Minecraft Forums](http://www.minecraftforum.net/topic/2145418-).


## License

Creative Commons Zero 1.0 Universal Public Domain Dedication


