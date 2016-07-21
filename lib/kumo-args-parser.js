'use strict';

const _ = require('lodash');
const minimist = require('minimist');

class KumoArgsParser {
    
    parse(args) {
        args = minimist(args.slice(2));
        const globalOptions = _.pick(args, ['cwd', 'verbose', 'help']);
        const actionName = args['_'].join(' ');
        const actionOptions = _.omit(args, _.concat(_.keys(globalOptions), '_'));
        return {actionName, actionOptions, globalOptions};
    }
}

module.exports = KumoArgsParser;
