import { SourceFile, SyntaxKind, ClassDeclaration } from 'typescript';
import {
    FileMetadata,
    ClassMetadata,
    ComponentMetadata
} from '../model/project-metadata';
import { ClassParser } from './class-parser';
import { getClassDecorators } from '../reflect-utils';
import { ComponentParser } from './component-parser';

export class SourceFileParser {
    parse(file: SourceFile): FileMetadata {
        const meta = new FileMetadata();

        meta.fileName = file.fileName;

        file.statements.forEach((statement) => {
            switch (statement.kind) {
                case SyntaxKind.ClassDeclaration:
                    const declaration = statement as ClassDeclaration;
                    const decorators = getClassDecorators(declaration);
                    if (decorators.indexOf('Component') !== -1) {
                        const componentMeta = this.parseComponent(declaration);
                        meta.components.push(componentMeta);
                        return;
                    }

                    return;

                default:
                    break;
            }
        });

        return meta;
    }

    private parseComponent(declaration: ClassDeclaration): ComponentMetadata {
        const parser = new ComponentParser();
        return parser.parse(declaration);
    }
}
