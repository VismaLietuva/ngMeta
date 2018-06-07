import { JSDocParameterTag, Identifier } from 'typescript';
import { ParamTag } from './jsdoc-parser';

export class JSDocParamtagParser {
    parse(tag: JSDocParameterTag): ParamTag {
        const info = new ParamTag();

        info.paramName = (tag.name as Identifier).text;
        info.text = tag.comment;

        return info;
    }
}