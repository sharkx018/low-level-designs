const {Logger} = require('./logger')

class ConsoleLogger extends Logger{
    constructor(level) {
        super(level);
    }

    write(message) {
        console.log(`Console::Logger: ${message}`)
    }

}

module.exports = ConsoleLogger
