export class NothingToWatch extends Error {
    constructor() {
        super("No folder/path is passed for watch")
    }
}

export class InvalidFileName extends Error {
    constructor() {
        super('Invalid filename or file extension is missing')
        Error.captureStackTrace(this, this.constructor)
    }
}

export class InvalidUserConfig extends Error {
    constructor() {
        super('Unable to parse the User Config, Default config is being used')
    }
}
