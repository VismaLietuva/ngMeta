import { JSDoc } from "typescript";

declare module "typescript" {

    export interface JSDocContainer {
        jsDoc?: JSDoc[];
    }

}

