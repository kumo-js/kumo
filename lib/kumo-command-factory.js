'use strict';

const ActionFinder = require('./action-finder');
const ActionLoadersFactory = require('./action-loaders-factory');
const KumoCommand = require('./kumo-command');

class KumoCommandFactory {

    constructor(params) {
        this._logger = params.logger;
    }

    createCommand(context) {
        const actionFinder = this._createActionFinder(context);
        return new KumoCommand({
            actionFinder: actionFinder,
            context: context,
            logger: this._logger
        });
    }

    _createActionFinder(context) {
        return new ActionFinder({
            actionLoadersFactory: new ActionLoadersFactory({
                context: context,
                logger: this._logger
            })
        });
    }
}

module.exports = KumoCommandFactory;
