var docparse = require('./lib/docparse'),
docdown = require('./lib/docdown');

function sync (text, options) {
    var markdown;
    text = typeof text === 'string' ? text : null;
    options = typeof options === 'object' ? options : {};
    options.root = options.root || process.cwd();
    options.fileName = options.fileName || 'style.css';

    if (text) {
        markdown = docdown(docparse(text), options);
        if (markdown) {
            return markdown;
        } else {
            return null;
        }
    } else {
        return new Error('styledocdown: First arg must be a string.');
    }
};

module.exports = function (text, options) {
    var lastArgument = arguments[arguments.length - 1],
    cb = typeof lastArgument === 'function' ? lastArgument : null,
    data = sync(text, options);

    if (cb) {
        if (data instanceof Error) {
            cb(data);
        } else {
            cb(null, data);
        }
    }
};

module.exports.sync = sync;
