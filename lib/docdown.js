var fs = require('fs'),
path = require('path');

// Helper which gets a file content
function getFile(filepath) {
    try {
        fs.accessSync(filepath, fs.F_OK);
    } catch(e) {
        return null;
    }
    return {
        ext: path.extname(filepath).slice(1),
        content: fs.readFileSync(filepath, 'utf-8').trim()
    }
}

// Helper which create common markdown patern
function outputFile(fileObj, isCodeblock) {
    var section = [],
    codeBlockSeparator = '```';
    if (!fileObj) {
        return;
    }
    if (isCodeblock) {
        section.push(codeBlockSeparator + fileObj.ext);
    }
    section.push(fileObj.content);
    if (isCodeblock) {
        section.push(codeBlockSeparator);
    }
    return section.join('\n');
}

// TODO: better error handling

module.exports = function (list, options) {
    var doc = [],
        breakline = '\n\n',
        fileRoot = options ? options.root : '',
        ext = (options && typeof options.fileName === 'string') ? path.extname(options.fileName).slice(1) : '',
        desc, demo, name, file, i, len;

    if (!list) {
        return;
    }

    for (i = 0, len = list.length; i < len; i += 1) {
        desc = [];
        demo = [];

        name = list[i].name || 'Untitled section';
        desc.push('# ' + name);

        if(list[i].summary) {
            desc.push('> ' + list[i].summary);
        }

        if (list[i].description) {
            file = outputFile(getFile(path.join(fileRoot, list[i].description)));
            if (file) {
                desc.push(file);
            }
        }

        if (list[i].example) {
            file = outputFile(getFile(path.join(fileRoot, list[i].example)));
            if (file) {
                demo.push(file);
            }
        }

        if (list[i].tutorial) {
            file = outputFile(getFile(path.join(fileRoot, list[i].tutorial)), true);
            if (file) {
                demo.push(file);
            }
        }

        if (list[i].code) {
            demo.push(outputFile({content: list[i].code, ext: ext}, true));
        }

        // add separator between desc and demo sections
        if (demo.length) {
            desc.push('---');
        }

        // push description and demo sections to document
        doc.push(desc.join(breakline));
        doc.push(demo.join(breakline));
    }

    return doc.join(breakline);
}
