// const {createLogger,transports,format} = require('winston');

// const Logger = createLogger({
//     format :format.combine(format.colorize(),
//     format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
//     logFormat  ),
//     transports:[
//         // new transports.File({
//         //     level : 'info',
//         //     filename: './Logs/Logs.log'
           
//         // }),
//         new transports.File({
//             // level : 'error',
//             filename: './Logs/Logs.log'
//             // format :format.combine(format.colorize(),format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),format.simple())

//         })
//     ]
// })
const { format, createLogger, transports } = require('winston');
var DatadogWinston = require('datadog-winston')
const { timestamp, combine, printf, errors } = format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });
const Logger =  createLogger({
    
    format: combine(
    //   format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports:[
                new transports.File({
                    level : 'info',
                    filename: './Logs/Logs.log'
                   
                }),
                new transports.File({
                    level : 'error',
                    filename: './Logs/Logs.log'
                    // format :format.combine(format.colorize(),format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),format.simple())
        
                }),

                // new transports.Http({ path: "http://logs-01.loggly.com/inputs/9954fb8d-e52b-4293-85b5-62e4643681bc/tag/http/",batch:true,batchCount: 3 }),
                // new transports.Loggly()
                // new transports.Stream
            ]
  });
// Logger.add(
//     new DatadogWinston({
//       apiKey: 'c69f14ea7db8ae2d89371c48d101484a',
//       hostname: 'shivaram',
//       ddsource: 'nodejs',
//     })
//   )
module.exports = { Logger};