import { SourceFile, SyntaxKind, ClassDeclaration } from "typescript";
import { ClassParser, ClassMetadata } from "./class-parser";


export class FileMetadata {
    path: string;
    classes: ClassMetadata[];

    constructor() {
        this.classes = [];
    }
}


export class FileParser {

    private _classParser: ClassParser;

    constructor() {
        this._classParser = new ClassParser();
    }


    parse(file: SourceFile): FileMetadata {

        const fileMeta = new FileMetadata();

        fileMeta.path = file.fileName;

        file.statements.forEach((statement) => {
            if (statement.kind === SyntaxKind.ClassDeclaration) {
                const classMeta = this._classParser.parse(statement as ClassDeclaration);
                fileMeta.classes.push(classMeta);
            }
        });

        return fileMeta;
    }
}