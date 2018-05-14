import * as yargs from 'yargs';

export class RuntimeOptions {
    entryPoint: string;
}

export function getOptions(): RuntimeOptions {
    const args = yargs.command(
        '$0 <entry-point> [options]',
        'Parse angular application and output resulting metadata to a JSON file'
    ).argv;

    // console.log(args);

    return {
        entryPoint: args.entryPoint
    };
}
