'use strict';

class Plugin {

    constructor(params) {
        this._module = params.module;
        this._prefix = params.prefix;
    }

    actions() {
        return this._module.actions().map(
            a => this._prefix.apply(a)
        );
    }

    invokeAction(action, options, context) {
        action = this._prefix.remove(action);
        return this._module.invokeAction(action, options, context);
    }
}

module.exports = Plugin;
