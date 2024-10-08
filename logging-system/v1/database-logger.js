const {Logger} = require('./logger')

class DatabaseLogger extends Logger{
    constructor(level) {
        super(level);
    }

    write(message) {
        console.log(`Database-Logger::Logger: ${message}`)
    }
}

module.exports = DatabaseLogger
