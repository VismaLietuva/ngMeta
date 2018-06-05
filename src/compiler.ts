import { CompilerOptions, SourceFile, createProgram, isExternalModuleReference } from "typescript";
import * as path from 'path';

export class Compiler {
    private _options: CompilerOptions;

    constructor(options: CompilerOptions) {
        this._options = { ...options };
    }

    compile(entryPoint: string): SourceFile[] {
        const _path = path.resolve(path.normalize(entryPoint));

        const program = createProgram([_path], this._options);

        const files = program
            .getSourceFiles()
            .filter(
                (f) => !isExternalModuleReference(f) && !f.isDeclarationFile
            );
        return files;
    }

}