export class ProjectMetadata {
    readonly files: FileMetadata[] = [];
}

export class FileMetadata {
    fileName: string;
    readonly classes: ClassMetadata[] = [];
    readonly components: ComponentMetadata[] = [];
}

export class ClassMetadata {
    name: string;
}

export class ComponentMetadata extends ClassMetadata {
    name: string;
    selector: string;
    heritage: HeritageMetadata = new HeritageMetadata();
}

export class HeritageMetadata {
    extends: string[] = [];
    implements: string[] = [];
}
