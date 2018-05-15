import { BaseParser } from './base-parser';
import { IMetadata } from '../model/metadata';
import { Node, ClassDeclaration, Identifier, SyntaxKind } from 'typescript';

export class ClassParser extends BaseParser {
    parse(node: Node): any {
        //debugger;

        const c = node as ClassDeclaration;

        let metadata = {
            name: c.name.escapedText
        };

        c.members.forEach((m) => {
            console.log(SyntaxKind[m.kind]);
        });

        return metadata;
    }
}
