var fs = require('fs');
var AdmZip = require('adm-zip');

var root = 'images';
var out = 'ProgrammerArt-TexturePack.zip';

fs.readdir(root, function(err, files) {
    console.log("files = " + files);
    
    var zip = new AdmZip();

    zip.addFile('textures/', new Buffer(0));
    zip.addFile('textures/blocks/', new Buffer(0));

    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        var name = 'textures/blocks/' + file;

        console.log('Adding ' + file + ' as ' + name);
        zip.addLocalFile(root + '/' + file, name);
    }

    zip.writeZip(out);

    console.log("Wrote " + out);
});

