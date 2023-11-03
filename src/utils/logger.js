import winston from "winston";
import dotenv from "dotenv";
import config from "../config/config.js";

dotenv.config({
  path: config.ENVIRONMENT === "PRODUCTION" ? './.env.production' : './.env.development'
});

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'white'
  }
};

const loggerOptions = {
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: config.ENVIRONMENT === "PRODUCTION" ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({ 
        colors: customLevelsOptions.colors,
        level: true,
        message: false
      }),
      winston.format.simple()
      )
    })
  ]
};
// Agregar transporte de archivo solo para el entorno de producción
if (config.ENVIRONMENT === "PRODUCTION") {
  loggerOptions.transports.push(
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: winston.format.simple()
    })
  );
}

const logger = winston.createLogger(loggerOptions);

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
};