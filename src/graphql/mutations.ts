/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      projectName
      language
      runResult
      createTime
      shareTo
      byProjectDoc {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectTodo {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          check
          projectID
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectCode {
        id
        codeURL
        createdAt
        updatedAt
        owner
        shareTo
      }
      createdAt
      updatedAt
      projectByProjectCodeId
      owner
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      projectName
      language
      runResult
      createTime
      shareTo
      byProjectDoc {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectTodo {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          check
          projectID
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectCode {
        id
        codeURL
        createdAt
        updatedAt
        owner
        shareTo
      }
      createdAt
      updatedAt
      projectByProjectCodeId
      owner
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      projectName
      language
      runResult
      createTime
      shareTo
      byProjectDoc {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectTodo {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          check
          projectID
          createdAt
          updatedAt
          owner
          shareTo
        }
        nextToken
      }
      byProjectCode {
        id
        codeURL
        createdAt
        updatedAt
        owner
        shareTo
      }
      createdAt
      updatedAt
      projectByProjectCodeId
      owner
    }
  }
`;
export const createCode = /* GraphQL */ `
  mutation CreateCode(
    $input: CreateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    createCode(input: $input, condition: $condition) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const updateCode = /* GraphQL */ `
  mutation UpdateCode(
    $input: UpdateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    updateCode(input: $input, condition: $condition) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const deleteCode = /* GraphQL */ `
  mutation DeleteCode(
    $input: DeleteCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    deleteCode(input: $input, condition: $condition) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const createDoc = /* GraphQL */ `
  mutation CreateDoc(
    $input: CreateDocInput!
    $condition: ModelDocConditionInput
  ) {
    createDoc(input: $input, condition: $condition) {
      docURL
      docType
      projectID
      id
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const updateDoc = /* GraphQL */ `
  mutation UpdateDoc(
    $input: UpdateDocInput!
    $condition: ModelDocConditionInput
  ) {
    updateDoc(input: $input, condition: $condition) {
      docURL
      docType
      projectID
      id
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const deleteDoc = /* GraphQL */ `
  mutation DeleteDoc(
    $input: DeleteDocInput!
    $condition: ModelDocConditionInput
  ) {
    deleteDoc(input: $input, condition: $condition) {
      docURL
      docType
      projectID
      id
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      todoURL
      todoTitle
      lineNumber
      check
      projectID
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      todoURL
      todoTitle
      lineNumber
      check
      projectID
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      todoURL
      todoTitle
      lineNumber
      check
      projectID
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
