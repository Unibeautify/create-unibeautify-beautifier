#!/usr/bin/env node

import * as yargsInteractive from "yargs-interactive";
import * as path from "path";
import chalk from "chalk";
import { spawn } from "child_process";
const { scaffold } = require("egad");

const template_url = "https://github.com/Unibeautify/beautifier-template";

// tslint:disable:object-literal-sort-keys
const options: yargsInteractive.Option = {
  interactive: { default: true },
  beautifierName: {
    describe: "What is the name of the beautifier? @unibeautify/beautifier-",
    prompt: "always",
    type: "input",
  },
  type: {
    describe: "Is this Node or Executable based?",
    prompt: "always",
    type: "list",
    choices: ["Node", "Executable"],
  },
  name: {
    describe: "What is the proper name of the beautifier?",
    prompt: "always",
    type: "input",
  },
  packageName: {
    describe:
      "What is the name of the package (node only, what you would install from npm)?",
    prompt: "always",
    type: "input",
  },
  exeCommand: {
    describe: "What is the command of the exe (executable only)?",
    prompt: "always",
    type: "input",
  },
  homepageUrl: {
    describe: "What is the homepage URL of the beautifier?",
    prompt: "always",
    type: "input",
  },
  installationUrl: {
    describe:
      "What is the URL containing installation instructions for the beautifier?",
    prompt: "always",
    type: "input",
  },
  bugsUrl: {
    describe: "What is the URL to report bugs for the beautifier?",
    prompt: "always",
    type: "input",
  },
};

// tslint:disable:no-console
yargsInteractive()
  .usage("$0 <command> [args]")
  .interactive(options)
  .then((result: any) => {
    result.dashedName = result.beautifierName
      .replace(/\s+/g, "-")
      .toLowerCase();
    const destination = path.resolve(
      process.cwd(),
      `beautifier-${result.dashedName}`
    );
    return scaffold(template_url, destination, result, {})
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
        return console.log(chalk.blue("Finished scaffolding files."));
      })
      .then(() => {
        console.log(chalk.blue("\nInstalling Node dependencies..."));
        const child = spawn("npm", ["install", "--prefix", destination], {
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
