var fs = require('fs'),
	path = require('path'),
	postcss = require('postcss');

var docParts = /^\/\*\*\s*$((?!^\/\*\*\s*$)[\s\S])*/gm,
    docArticle = /^\/\*\*\s*\n([\s\S]*)(?:\n\*\/\s*\n)([\s\S]*)$/,
    docDef = /\*\s+\@(\w+)(?:.(.+))?(?:\n|$)/g;

// Helper to test if a module exists
function fileExists(path) {
	try {
		return require.resolve(path);
	}
	catch(e) {
		return false;
	}
}

function titleToName(title) {
	return title.replace(/\s+/g, '-').replace(/[^A-z0-9_-]/g, '').toLowerCase();
}

function generateMD (list, options) {
     var doc = [],
        section, description, example, i, len;
     for (i = 0, len = list.length; i < len; i += 1) {
        section = [];
        description = fileExists(options.root + list[i].description);
        example = fileExists(options.root + list[i].example);

        //section.push('<section id="' + list[i].id + '">');
        //section.push('');

        if (list[i].name) {
            section.push('# ' + list[i].name);
            section.push('');
        }
        if(list[i].summary) {
            section.push(list[i].summary);
            section.push('');
        }
        if (description) {
            description = fs.readFileSync(description, 'utf-8').trim();
            section.push('---');
            section.push('');
            section.push(description);
            section.push('');
        }
        if (example) {
			example = fs.readFileSync(example, 'utf-8').trim();
            section.push(example);
            section.push('');
            section.push('---');
            section.push('');
            section.push('```html');
            section.push(example);
            section.push('```');
            section.push('');
        }
        if (list[i].code) {
            section.push('```less');
            section.push(list[i].code);
            section.push('```');
            section.push('');
        }
        //section.push('</section>');

        // push section to doc
        doc.push(section.join('\n'));
     }
     return doc.join('\n');
}

module.exports = {
    parse: function (text, options) {
		var hash = {},
			uniq = 0,
			section = {},
			i, len, list, article, tempDefArr;

		options = options || {};
		options.root = options.root || process.cwd();

        list = text.match(docParts);

        for (i = 0, len = list.length; i < len; i += 1) {
            article = docArticle.exec(list[i]);
            section.code = article[2];
            while ((tempDefArr = docDef.exec(article[1])) !== null) {
                if (tempDefArr.index === docDef.lastIndex) {
                    docDef.lastIndex += 1;
                }
                section[tempDefArr[1]] = tempDefArr[2];
            }

            // set unique id for a section
            section.id = section.name ? titleToName(section.name) : 'section';
            uniqid = section.id;
			while (hash[uniqid]) {
                uniqid = section.id + --uniq;
            }

			// push documentation id to hash
			hash[uniqid] = 1;

            list[i] = section;
        }
        return generateMD(list, options);
    }
};
