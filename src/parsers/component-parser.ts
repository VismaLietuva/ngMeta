import { ClassParser } from './class-parser';
import {
    ClassDeclaration,
    CallExpression,
    ObjectLiteralExpression,
    StringLiteral
} from 'typescript';
import { ComponentMetadata, HeritageMetadata } from '../model/project-metadata';
import { HeritageParser } from './heritage-parser';
import {
    getDecoratorByName,
    getPropertyAssignmentByName
} from '../reflect-utils';

export class ComponentParser {
    parse(declaration: ClassDeclaration): ComponentMetadata {
        const meta = new ComponentMetadata();
        meta.name = declaration.name.text;

        meta.heritage = this.parseHeritage(declaration);
        this.parseComponentDecorator(declaration, meta);

        return meta;
    }

    private parseHeritage(declaration: ClassDeclaration): HeritageMetadata {
        const parser = new HeritageParser();
        return parser.parse(declaration);
    }

    private parseComponentDecorator(
        declaration: ClassDeclaration,
        meta: ComponentMetadata
    ) {
        const decorator = getDecoratorByName(declaration, 'Component');

        if (!decorator) {
            return;
        }

        const arg = (decorator.expression as CallExpression)
            .arguments[0] as ObjectLiteralExpression;

        const prop = getPropertyAssignmentByName(arg, 'selector');

        if (!prop) {
            return;
        }

        meta.selector = (prop.initializer as StringLiteral).text;
    }
}
