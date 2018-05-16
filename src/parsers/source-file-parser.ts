import { SourceFile } from 'typescript';

export class SourceFileParser {
    parse(file: SourceFile): any {
        const result = <any>{};

        result.fileName = file.fileName;

        file.statements.forEach((statement) => {});
    }
}
