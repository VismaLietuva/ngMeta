import { Node, ClassDeclaration, Identifier, SyntaxKind } from 'typescript';

export class ClassParser {
    parse(node: Node): any {
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
