var docparse = require('./lib/docparse'),
docdown = require('./lib/docdown');

function sync (text, options) {
    text = typeof text === 'string' ? text : null;
    options = typeof options === 'object' ? options : {};
    options.root = options.root || process.cwd();
    options.fileName = options.fileName || 'style.css';

    if (text) {
        return docdown(docparse(text), options);
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
