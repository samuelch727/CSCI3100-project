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
  readonly codeURL?: string | null;
  readonly shareTo?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Code, CodeMetaData>);
  static copyOf(source: Code, mutator: (draft: MutableModel<Code, CodeMetaData>) => MutableModel<Code, CodeMetaData> | void): Code;
}

export declare class Todo {
  readonly id: string;
  readonly todoURL?: string | null;
  readonly todoTitle?: string | null;
  readonly lineNumber?: number | null;
  readonly check?: boolean | null;
  readonly projectID: string;
  readonly shareTo?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class Project {
  readonly id: string;
  readonly documents?: (Doc | null)[] | null;
  readonly projectName: string;
  readonly language: string;
  readonly code?: string | null;
  readonly todo?: string | null;
  readonly runResult?: string | null;
  readonly createTime?: number | null;
  readonly shareTo?: (string | null)[] | null;
  readonly Todos?: (Todo | null)[] | null;
  readonly Code?: Code | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly projectCodeId?: string | null;
  constructor(init: ModelInit<Project, ProjectMetaData>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}

export declare class Doc {
  readonly id: string;
  readonly docURL: string;
  readonly docType?: string | null;
  readonly projectID: string;
  readonly shareTo?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Doc, DocMetaData>);
  static copyOf(source: Doc, mutator: (draft: MutableModel<Doc, DocMetaData>) => MutableModel<Doc, DocMetaData> | void): Doc;
}