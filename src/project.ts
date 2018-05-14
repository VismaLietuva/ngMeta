import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

import { RuntimeOptions } from './cli';
import { parsers } from './parsers/parser-factory';

const TS_CONFIG = 'tsconfig.json';
const COMPILER_OPTIONS: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2015,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs
};

export class Project {
    private readonly entryPoint: string;
    private files: ts.SourceFile[];
    constructor(options: RuntimeOptions) {
        // TODO: check folder exists fs.stat()
        this.entryPoint = path.resolve(path.normalize(options.entryPoint));
        console.log(`\nParsing Angular project form  ${this.entryPoint}\n`);

        const program = ts.createProgram([this.entryPoint], COMPILER_OPTIONS);

        this.files = program
            .getSourceFiles()
            .filter(
                (f) => !ts.isExternalModuleReference(f) && !f.isDeclarationFile
            );

        // fileNames.forEach((f) => {
        //     console.log(path.resolve(f.fileName));
        // });

        this.files.forEach((f) => {
            this.parseFile(f);
        });
    }

    parseFile(file: ts.SourceFile) {
        console.log(file.fileName);
        ts.forEachChild(file, (node) => {
            //console.log(ts.SyntaxKind[node.kind]);

            const parser = parsers.get(node.kind);

            if (!parser) {
                // console.error(
                //     `Error: could not get parser for ${
                //         ts.SyntaxKind[node.kind]
                //     }`
                // );
                return;
            }

            console.log('parser', parser);

            const result = parser.parse(node);
            console.log(result);
        });
    }
}
