#!/usr/bin/env node

import * as yargsInteractive from "yargs-interactive";
import chalk from "chalk";
import { spawn } from "child_process";
const { scaffold } = require("egad");

const template_url = "https://github.com/Unibeautify/beautifier-template";

// tslint:disable:object-literal-sort-keys
const options: yargsInteractive.Option = {
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
    options: ["Node", "Executable"],
  },
  packageName: {
    describe: "What is the name of the package or command of the executable?",
    prompt: "always",
    type: "input",
  },
};

yargsInteractive()
  .usage("$0 <command> [args]")
  .interactive(options)
  .then((result: any) => {
    result.dashedName = result.name.replace(/\s+/g, "-").toLowerCase();
    // tslint:disable
    console.log(result);
    return scaffold(template_url, process.cwd(), result, {})
      .then((results: any) => {
        results.forEach((fileInfo: any) => {
          console.log(
            `${
              fileInfo.skipped
                ? chalk.yellow("Skipped file")
                : chalk.green("Created file")
            }: ${fileInfo.path}`
          );
        });
        return console.log(chalk.blue("Finished scaffolding files!"));
      })
      .then(() => {
        console.log(chalk.blue("\nInstalling Node dependencies!"));
        const child = spawn("npm", ["install", "--prefix", process.cwd()], {
          stdio: "inherit",
        });
        child.on("close", code => {
          if (code !== 0) {
            console.log(
              chalk.red(
                `Could not install npm dependencies. Try running ${chalk.bold(
                  "npm install"
                )} yourself.`
              )
            );
            return;
          }
          console.log(chalk.blue("\nDone! Your beautifier is ready to build!"));
        });
      });
  });
