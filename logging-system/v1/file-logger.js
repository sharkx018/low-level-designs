const {Logger} = require('./logger')

class FileLogger extends Logger{
    constructor(level) {
        super(level);
    }

    write(message) {
        console.log(`File-Logger::Logger: ${message}`)
    }

}

module.exports = FileLogger
