const { createLogger, format, transports } = require("winston");

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  test: 3,
  debug: 4,
};

module.exports = createLogger({
  levels: logLevels,
  level: "debug",
  format: format.combine(
    format.timestamp({ format: `YYYY-MM-DDTHH:mm:ss.SSSZ` }),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: "./logs/service.log",
    }),
  ],
});