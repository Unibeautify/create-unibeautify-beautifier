declare function yargsInteractive(): any;

declare namespace yargsInteractive {
  interface OptionData {
    type: string;
    describe: string;
    default?: string | number | boolean;
    prompt?: string;
  }
    
  interface Option {
    [key: string]: OptionData;
  }
  
  interface Interactive {
    usage(usage: string): any;
    interactive(options: Option[]): any;
    then(callback: (result: any) => any): any;
  }
}

export = yargsInteractive;
