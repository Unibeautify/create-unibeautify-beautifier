declare function yargsInteractive(): yargsInteractive.Interactive;

declare namespace yargsInteractive {
  interface OptionData {
    type: string;
    describe: string;
    default?: string | number | boolean;
    prompt?: string;
    choices?: string[];
  }

  interface Option {
    [key: string]: OptionData | { default: boolean };
  }

  interface Interactive {
    usage(usage: string): Interactive;
    interactive(options: Option): Interactive;
    then(callback: (result: any) => any): Interactive;
  }
}

export = yargsInteractive;
