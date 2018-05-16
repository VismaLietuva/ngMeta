import {
    ClassDeclaration,
    HeritageClause,
    SyntaxKind,
    Identifier
} from 'typescript';
import { HeritageMetadata } from '../model/project-metadata';

export class HeritageParser {
    parse(declaration: ClassDeclaration): HeritageMetadata {
        if (
            !declaration.heritageClauses ||
            declaration.heritageClauses.length === 0
        ) {
            return null;
        }

        const meta = new HeritageMetadata();

        declaration.heritageClauses.forEach((h) => {
            this.parseHeritageClause(h, meta);
        });

        return meta;
    }

    parseHeritageClause(clause: HeritageClause, meta: HeritageMetadata) {
        let array: string[];
        if (clause.token === SyntaxKind.ExtendsKeyword) {
            array = meta.extends;
        } else {
            array = meta.implements;
        }

        clause.types.forEach((t) => {
            const text = (t.expression as Identifier).text;
            array.push(text);
        });
    }
}
