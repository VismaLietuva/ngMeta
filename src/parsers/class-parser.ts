import { Node, ClassDeclaration, Identifier, SyntaxKind } from 'typescript';
import { ClassMetadata } from '../model/project-metadata';

export class ClassParser {
    parse(declaration: ClassDeclaration): ClassMetadata {
        const meta = new ClassMetadata();
        meta.name = declaration.name.text;

        return meta;
    }
}
