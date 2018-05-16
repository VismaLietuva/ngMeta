import { ClassParser } from './class-parser';
import { ClassDeclaration } from 'typescript';
import { ComponentMetadata, HeritageMetadata } from '../model/project-metadata';
import { HeritageParser } from './heritage-parser';

export class ComponentParser {
    parse(declaration: ClassDeclaration): ComponentMetadata {
        const meta = new ComponentMetadata();
        meta.name = declaration.name.text;

        meta.heritage = this.parseHeritage(declaration);

        return meta;
    }

    private parseHeritage(declaration: ClassDeclaration): HeritageMetadata {
        const parser = new HeritageParser();
        return parser.parse(declaration);
    }
}
