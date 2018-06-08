import * as yargs from 'yargs';

export class RuntimeOptions {
    constructor(
        public entryPoint: string,
        public output: string) { }
}

export class Cli {
    static getOptions(): RuntimeOptions {
        var argv = yargs
            .usage('Usage: $0 -e [path] [-o [path]]')
            .option('e', {
                describe: 'Entry point to Angular application or library (usually "main.ts" for application and "public_api.ts" for library)',
                alias: 'entry',
                demandOption: true,
                type: 'string'
            })
            .option('o', {
                describe: 'Path to the output file',
                alias: 'output',
                demandOption: false,
                type: 'string',
                default: './metadata.json'
            })
            .demandOption('e', "Please prove a path to entry point file")
            .argv

        return new RuntimeOptions(argv['entry'], argv['output']);
    }
}

