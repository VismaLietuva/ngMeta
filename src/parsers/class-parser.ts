import { BaseParser } from './base-parser';
import { IMetadata } from '../model/metadata';
import { Node } from 'typescript';

export class ClassParser extends BaseParser {
    parse(node: Node): IMetadata {
        debugger;
        Object.getOwnPropertyNames(node).forEach((k) => {
            console.log(k);
        });

        //console.log(node);

        return null;
    }
}
