/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  projectName: string,
  language: string,
  runResult?: string | null,
  createTime?: number | null,
  shareTo?: Array< string | null > | null,
  projectByProjectCodeId?: string | null,
};

export type ModelProjectConditionInput = {
  projectName?: ModelStringInput | null,
  language?: ModelStringInput | null,
  runResult?: ModelStringInput | null,
  createTime?: ModelIntInput | null,
  shareTo?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
  projectByProjectCodeId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  projectName: string,
  language: string,
  runResult?: string | null,
  createTime?: number | null,
  shareTo?: Array< string | null > | null,
  byProjectDoc?: ModelDocConnection | null,
  byProjectTodo?: ModelTodoConnection | null,
  byProjectCode?: Code | null,
  createdAt: string,
  updatedAt: string,
  projectByProjectCodeId?: string | null,
  owner?: string | null,
};

export type ModelDocConnection = {
  __typename: "ModelDocConnection",
  items:  Array<Doc | null >,
  nextToken?: string | null,
};

export type Doc = {
  __typename: "Doc",
  docURL: string,
  docType?: string | null,
  projectID: string,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
  shareTo?: string | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  todoURL: string,
  todoTitle?: string | null,
  lineNumber?: string | null,
  check?: boolean | null,
  projectID: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
  shareTo?: string | null,
};

export type Code = {
  __typename: "Code",
  id: string,
  codeURL: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
  shareTo?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  projectName?: string | null,
  language?: string | null,
  runResult?: string | null,
  createTime?: number | null,
  shareTo?: Array< string | null > | null,
  projectByProjectCodeId?: string | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateCodeInput = {
  id?: string | null,
  codeURL: string,
};

export type ModelCodeConditionInput = {
  codeURL?: ModelStringInput | null,
  and?: Array< ModelCodeConditionInput | null > | null,
  or?: Array< ModelCodeConditionInput | null > | null,
  not?: ModelCodeConditionInput | null,
};

export type UpdateCodeInput = {
  id: string,
  codeURL?: string | null,
};

export type DeleteCodeInput = {
  id: string,
};

export type CreateDocInput = {
  docURL: string,
  docType?: string | null,
  projectID: string,
  id?: string | null,
};

export type ModelDocConditionInput = {
  docURL?: ModelStringInput | null,
  docType?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelDocConditionInput | null > | null,
  or?: Array< ModelDocConditionInput | null > | null,
  not?: ModelDocConditionInput | null,
};

export type UpdateDocInput = {
  docURL?: string | null,
  docType?: string | null,
  projectID?: string | null,
  id: string,
};

export type DeleteDocInput = {
  id: string,
};

export type CreateTodoInput = {
  id?: string | null,
  todoURL: string,
  todoTitle?: string | null,
  lineNumber?: string | null,
  check?: boolean | null,
  projectID: string,
};

export type ModelTodoConditionInput = {
  todoURL?: ModelStringInput | null,
  todoTitle?: ModelStringInput | null,
  lineNumber?: ModelStringInput | null,
  check?: ModelBooleanInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTodoInput = {
  id: string,
  todoURL?: string | null,
  todoTitle?: string | null,
  lineNumber?: string | null,
  check?: boolean | null,
  projectID?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  projectName?: ModelStringInput | null,
  language?: ModelStringInput | null,
  runResult?: ModelStringInput | null,
  createTime?: ModelIntInput | null,
  shareTo?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
  projectByProjectCodeId?: ModelIDInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type ModelCodeFilterInput = {
  id?: ModelIDInput | null,
  codeURL?: ModelStringInput | null,
  and?: Array< ModelCodeFilterInput | null > | null,
  or?: Array< ModelCodeFilterInput | null > | null,
  not?: ModelCodeFilterInput | null,
};

export type ModelCodeConnection = {
  __typename: "ModelCodeConnection",
  items:  Array<Code | null >,
  nextToken?: string | null,
};

export type ModelDocFilterInput = {
  docURL?: ModelStringInput | null,
  docType?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelDocFilterInput | null > | null,
  or?: Array< ModelDocFilterInput | null > | null,
  not?: ModelDocFilterInput | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  todoURL?: ModelStringInput | null,
  todoTitle?: ModelStringInput | null,
  lineNumber?: ModelStringInput | null,
  check?: ModelBooleanInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateCodeMutationVariables = {
  input: CreateCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type CreateCodeMutation = {
  createCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type UpdateCodeMutationVariables = {
  input: UpdateCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type UpdateCodeMutation = {
  updateCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type DeleteCodeMutationVariables = {
  input: DeleteCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type DeleteCodeMutation = {
  deleteCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type CreateDocMutationVariables = {
  input: CreateDocInput,
  condition?: ModelDocConditionInput | null,
};

export type CreateDocMutation = {
  createDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type UpdateDocMutationVariables = {
  input: UpdateDocInput,
  condition?: ModelDocConditionInput | null,
};

export type UpdateDocMutation = {
  updateDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type DeleteDocMutationVariables = {
  input: DeleteDocInput,
  condition?: ModelDocConditionInput | null,
};

export type DeleteDocMutation = {
  deleteDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      projectName: string,
      language: string,
      runResult?: string | null,
      createTime?: number | null,
      shareTo?: Array< string | null > | null,
      byProjectDoc?:  {
        __typename: "ModelDocConnection",
        nextToken?: string | null,
      } | null,
      byProjectTodo?:  {
        __typename: "ModelTodoConnection",
        nextToken?: string | null,
      } | null,
      byProjectCode?:  {
        __typename: "Code",
        id: string,
        codeURL: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      projectByProjectCodeId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCodeQueryVariables = {
  id: string,
};

export type GetCodeQuery = {
  getCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type ListCodesQueryVariables = {
  filter?: ModelCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCodesQuery = {
  listCodes?:  {
    __typename: "ModelCodeConnection",
    items:  Array< {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDocQueryVariables = {
  id: string,
};

export type GetDocQuery = {
  getDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type ListDocsQueryVariables = {
  filter?: ModelDocFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocsQuery = {
  listDocs?:  {
    __typename: "ModelDocConnection",
    items:  Array< {
      __typename: "Doc",
      docURL: string,
      docType?: string | null,
      projectID: string,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      todoURL: string,
      todoTitle?: string | null,
      lineNumber?: string | null,
      check?: boolean | null,
      projectID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    projectName: string,
    language: string,
    runResult?: string | null,
    createTime?: number | null,
    shareTo?: Array< string | null > | null,
    byProjectDoc?:  {
      __typename: "ModelDocConnection",
      items:  Array< {
        __typename: "Doc",
        docURL: string,
        docType?: string | null,
        projectID: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectTodo?:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        todoURL: string,
        todoTitle?: string | null,
        lineNumber?: string | null,
        check?: boolean | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        shareTo?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    byProjectCode?:  {
      __typename: "Code",
      id: string,
      codeURL: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      shareTo?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    projectByProjectCodeId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateCodeSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnCreateCodeSubscription = {
  onCreateCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnUpdateCodeSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnUpdateCodeSubscription = {
  onUpdateCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnDeleteCodeSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnDeleteCodeSubscription = {
  onDeleteCode?:  {
    __typename: "Code",
    id: string,
    codeURL: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnCreateDocSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnCreateDocSubscription = {
  onCreateDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnUpdateDocSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnUpdateDocSubscription = {
  onUpdateDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnDeleteDocSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnDeleteDocSubscription = {
  onDeleteDoc?:  {
    __typename: "Doc",
    docURL: string,
    docType?: string | null,
    projectID: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  owner?: string | null,
  shareTo?: string | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    todoURL: string,
    todoTitle?: string | null,
    lineNumber?: string | null,
    check?: boolean | null,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    shareTo?: string | null,
  } | null,
};
