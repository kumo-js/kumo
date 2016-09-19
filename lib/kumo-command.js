'use strict';

class KumoCommand {

    constructor(params) {
        this._actionFinder = params.actionFinder;
        this._context = params.context;
        this._logger = params.logger;
    }

    execute() {
        return this._findAction().then(action =>
            action.execute(this._actionParams())
        );
    }

    _findAction() {
        return this._actionFinder.find(this._actionName());
    }

    _actionParams() {
        return {
            args: this._context.args.actionArgs,
            kumoContext: this._context,
            logger: this._logger
        };
    }

    _actionName() {
        return this._context.args.actionName;
    }
}

module.exports = KumoCommand;
