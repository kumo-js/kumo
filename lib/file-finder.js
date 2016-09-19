'use strict';

const findUpFn = require('find-up');

class FileFinder {

    findUp(filename, options) {
        return findUpFn(filename, options).then(file => {
            if (!file) throw new Error(`${filename} not found!`);
            return file;
        });
    }
}

module.exports = FileFinder;
