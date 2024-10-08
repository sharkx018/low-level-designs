const LogLevel = {
    Info: 1,
    Debug: 2,
    Warning: 3,
    Error: 4,
}


class Logger{
    constructor(level) {
        this.level = level
        this.nextLogger = null
    }

    logMessage(level, message){

        if(level >= this.level){
            this.write(message)
        }else if(this.nextLogger != null){
            this.nextLogger.logMessage(level, message)
        }

    }

    setNextLogger(nextLogger){
        this.nextLogger = nextLogger
    }


    write(message){
        throw new Error('This method must be overridden!')
    }
}

module.exports = {Logger, LogLevel}
