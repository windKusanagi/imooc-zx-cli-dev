"use strict";

const log = require("@imooc-zx-cli-dev/log");
const semver = require("semver");
const colors = require("colors/safe");
const fixtures = require("./fixtures");
const pkg = require("../package.json");

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
    checkInputArgs();
  } catch (e) {
    log.error(e.message);
  }
}

function checkInputArgs() {
  const args = require("minimist")(process.argv.slice(2));
  checkArgs(args);
}

function checkArgs(args) {
  if (args.debug) {
    process.env.LOG_LEVEL = "verbose";
  } else {
    process.env.LOG_LEVEL = "info";
  }
  log.level = process.env.LOG_LEVEL;
}

function checkRootUser() {
  import("root-check").then(({ default: rootCheck }) => {
    // 对于用户进行降级，如果是 root 则会降级至普通用户级别， 通过 process.setgid 和 process.setuid 实现
    rootCheck();
  });
}

function checkUserHome() {
  import("path-exists").then(({ pathExistsSync }) => {
    const userHome = require("user-home");
    if (!userHome || !pathExistsSync(userHome)) {
      throw new Error(
        colors.red("The main dir of the current user does not exist")
      );
    }
  });
}

function checkNodeVersion() {
  if (semver.lt(process.version, fixtures.LOWEST_NODE_VERSION)) {
    throw new Error(
      colors.red(
        `imooc-zx-cli requires a minimum node version of v${fixtures.LOWEST_NODE_VERSION}`
      )
    );
  }
}

function checkPkgVersion() {
  log.notice("version", pkg.version);
}

module.exports = core;
