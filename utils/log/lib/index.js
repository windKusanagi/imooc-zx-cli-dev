"use strict";

const log = require("npmlog");

log.level = process.env.LOG_LEVEL || "info";
log.heading = "imooc-zx-cli";
log.headingStyle = { fg: "red", bold: true };

log.addLevel("success", 2000, { fg: "green", bold: true });

module.exports = log;
