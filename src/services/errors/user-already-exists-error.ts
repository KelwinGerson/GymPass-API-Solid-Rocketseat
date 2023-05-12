export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.') // the 'super' use the 'Error extended' 
    }
}