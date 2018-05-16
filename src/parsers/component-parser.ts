import { ClassParser } from './class-parser';
import { Node } from 'typescript';

export class ComponentParser extends ClassParser {
    parse(node: Node): any {
        console.log('Parsing component');
        const data = super.parse(node);

        return data;
    }
}
