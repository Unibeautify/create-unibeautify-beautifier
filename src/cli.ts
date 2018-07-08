#!/usr/bin/env node

import * as yargsInteractive from "yargs-interactive";
// const yargsInteractive = require("yargs-interactive");

// tslint:disable:object-literal-sort-keys
const options = {
  interactive: { default: true },
  name: {
    describe: "What is the name of the beautifier? @unibeautify/beautifier-",
    prompt: "always",
    type: "input",
  },
  type: {
    describe: "Is this Node or Executable based?",
    prompt: "always",
    type: "list",
    options: [
      "Node",
      "Executable"
    ],
  },
  packageName: {
    describe: "What is the name of the package?",
    prompt: "always",
    type: "input"
  },
};

yargsInteractive()
  .usage("$0 <command> [args]")
  .interactive(options)
  .then((result: any) => {
    // tslint:disable
    console.log(result);
  });
