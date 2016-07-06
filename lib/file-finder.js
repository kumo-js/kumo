const findUp = require('find-up');

class FileFinder {

    findUpSync(file, options) {
        findUp.sync(file, options);
    }
}

module.exports = FileFinder;