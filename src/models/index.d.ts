import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CodeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DocMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Code {
  readonly id: string;
  readonly codeURL?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Code, CodeMetaData>);
  static copyOf(source: Code, mutator: (draft: MutableModel<Code, CodeMetaData>) => MutableModel<Code, CodeMetaData> | void): Code;
}

export declare class Todo {
  readonly id: string;
  readonly todoURL?: string;
  readonly todoTitle?: string;
  readonly lineNumber?: number;
  readonly Check?: boolean;
  readonly projectID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class Project {
  readonly id: string;
  readonly documents?: (Doc | null)[];
  readonly projectName?: string;
  readonly language?: string;
  readonly code?: string;
  readonly todo?: string;
  readonly runResult?: string;
  readonly createTime?: number;
  readonly Todos?: (Todo | null)[];
  readonly Code?: Code;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly projectCodeId?: string;
  constructor(init: ModelInit<Project, ProjectMetaData>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}

export declare class Doc {
  readonly id: string;
  readonly docURL: string;
  readonly docType?: string;
  readonly projectID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Doc, DocMetaData>);
  static copyOf(source: Doc, mutator: (draft: MutableModel<Doc, DocMetaData>) => MutableModel<Doc, DocMetaData> | void): Doc;
}