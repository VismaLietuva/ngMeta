import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

import { RuntimeOptions } from './cli';
import { ClassParser } from './parsers/class-parser';
import { SourceFileParser } from './parsers/source-file-parser';
import { ProjectMetadata, FileMetadata } from './model/project-metadata';

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
        console.log(`\nParsing Angular project from  ${this.entryPoint}\n`);

        const program = ts.createProgram([this.entryPoint], COMPILER_OPTIONS);

        this.files = program
            .getSourceFiles()
            .filter(
                (f) => !ts.isExternalModuleReference(f) && !f.isDeclarationFile
            );

        const meta = new ProjectMetadata();

        this.files.forEach((f) => {
            const parser = new SourceFileParser();
            const fileMeta = parser.parse(f);
            meta.files.push(fileMeta);
        });

        console.log(meta);
    }
}
