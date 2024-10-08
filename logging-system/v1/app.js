const ConsoleLogger = require('./console-logger')
const DatabaseLogger = require('./database-logger')
const FileLogger = require('./file-logger')
const {LogLevel, Logger} = require('./logger')

function main(){

    const consoleLogger = new ConsoleLogger(LogLevel.Error)
    const fileLogger = new FileLogger(LogLevel.Warning)
    const databaseLogger = new DatabaseLogger(LogLevel.Debug)

    consoleLogger.setNextLogger(fileLogger)
    fileLogger.setNextLogger(databaseLogger)

    consoleLogger.logMessage(LogLevel.Warning, "This is a info message")
    consoleLogger.logMessage(LogLevel.Debug, "This is a debug message")
    consoleLogger.logMessage(LogLevel.Error, "This is a error message")


}



main()

