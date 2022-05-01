const {createLogger,transports,format} = require('winston');

const logFormat = format.printf(({level,message,timestamp})=>{
    return '${timestamp} ${level}: ${level}';
})
const Logger = createLogger({
    format :format.combine(format.colorize(),
    format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
    format.simple()),
    transports:[
        new transports.File({
            level : 'info',
            filename: './Logs/Logs.log'
           
        }),
        new transports.File({
            level : 'error',
            filename: './Logs/Logs.log',
            // format :format.combine(format.colorize(),format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),format.simple())

        })
    ]
})
module.exports = { Logger};