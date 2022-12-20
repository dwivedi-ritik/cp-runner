// Contains usefull error that user needed to see during the runtime of the cp-runner

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