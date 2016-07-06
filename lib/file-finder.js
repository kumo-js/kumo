'use strict';

const _ = require('lodash');
const findUp = require('find-up');

class FileFinder {

    static create() {
        return _.bindAll(new FileFinder());
    }

    findUpSync(filename, options) {
        const file = findUp.sync(filename, options);
        if (!file) throw new Error(`${filename} not found!`);
        return file;
    }
}

module.exports = FileFinder;