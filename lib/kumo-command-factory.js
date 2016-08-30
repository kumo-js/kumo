'use strict';

const fs = require('fs');
const ActionFinder = require('./action-finder');
const ActionLoadersFactory = require('./action-loaders-factory');
const FileFinder = require('./file-finder');
const KumoContext = require('./kumo-context');
const KumoCommand = require('./kumo-command');

class KumoCommandFactory {

    constructor(params) {
        this._logger = params.logger;
    }

    createCommand(args) {
        const kumoContext = this._createKumoContext(args);
        const actionFinder = this._createActionFinder(kumoContext);
        return new KumoCommand({
            actionFinder: actionFinder,
            kumoContext: kumoContext,
            logger: this._logger
        });
    }

    _createKumoContext(args) {
        return new KumoContext({
            args: args,
            fileFinder: new FileFinder(),
            fs: fs
        });
    }

    _createActionFinder(kumoContext) {
        return new ActionFinder({
            actionLoadersFactory: new ActionLoadersFactory({
                kumoContext: kumoContext,
                logger: this._logger
            })
        });
    }
}

module.exports = KumoCommandFactory;
