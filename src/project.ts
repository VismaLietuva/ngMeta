import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

import { RuntimeOptions } from './cli';

const TS_CONFIG = 'tsconfig.json';
const COMPILER_OPTIONS: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2015,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs
};

export class Project {
    private readonly entryPoint: string;
    constructor(options: RuntimeOptions) {
        // TODO: check folder exists fs.stat()
        this.entryPoint = path.resolve(path.normalize(options.entryPoint));
        //console.log(this.entryPoint);

        const program = ts.createProgram([this.entryPoint], COMPILER_OPTIONS);

        const fileNames = program
            .getSourceFiles()
            .filter(
                (f) => !ts.isExternalModuleReference(f) && !f.isDeclarationFile
            );

        fileNames.forEach((f) => {
            console.log(path.resolve(f.fileName));
        });
    }
}
