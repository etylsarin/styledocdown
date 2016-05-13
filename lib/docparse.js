// TODO: add error handling

module.exports = function (text) {
	var hash = {},
		uniq = 0,
		section = {},
        i, len, list, article, tempDefArr,
        docParts = /^\/\*\*\s*$((?!^\/\*\*\s*$)[\s\S])*/gm,
        docArticle = /^\s*\/\*\*\s*([\s\S]*)(?:\r\n?|\n)(?:\s*\*\/\s*)([\s\S]*)$/,
        docDef = /\*\s+\@(\w+)(?:.(.+))?(?:\r\n?|\n|$)/g,
        titleToName = function (title) {
        	return title.replace(/\s+/g, '-').replace(/[^A-z0-9_-]/g, '').toLowerCase();
        };

    list = text.match(docParts);

    if (!list) {
        return [{code: text}];
    }

    for (i = 0, len = list.length; i < len; i += 1) {
        article = docArticle.exec(list[i]);
        if (!article) {
            continue;
        }
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

    return list;
};
