#! /usr/bin/env node

// const utils = require("@imooc-zx-cli-dev/utils");

const importLocal = require("import-local");

if (importLocal(__filename)) {
  require("npmlog").info("cli", "using imooc-zx-cli local version");
} else {
  require("../lib")(process.argv.slice(2));
}
