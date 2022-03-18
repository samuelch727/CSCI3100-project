/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      Check
      projectID
      createdAt
      updatedAt
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
      Check
      projectID
      createdAt
      updatedAt
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
      Check
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const createDoc = /* GraphQL */ `
  mutation CreateDoc(
    $input: CreateDocInput!
    $condition: ModelDocConditionInput
  ) {
    createDoc(input: $input, condition: $condition) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const updateDoc = /* GraphQL */ `
  mutation UpdateDoc(
    $input: UpdateDocInput!
    $condition: ModelDocConditionInput
  ) {
    updateDoc(input: $input, condition: $condition) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const deleteDoc = /* GraphQL */ `
  mutation DeleteDoc(
    $input: DeleteDocInput!
    $condition: ModelDocConditionInput
  ) {
    deleteDoc(input: $input, condition: $condition) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      documents {
        items {
          id
          docURL
          docType
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectName
      language
      code
      todo
      runResult
      createTime
      Todos {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          Check
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      Code {
        id
        codeURL
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      projectCodeId
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
      documents {
        items {
          id
          docURL
          docType
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectName
      language
      code
      todo
      runResult
      createTime
      Todos {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          Check
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      Code {
        id
        codeURL
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      projectCodeId
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
      documents {
        items {
          id
          docURL
          docType
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectName
      language
      code
      todo
      runResult
      createTime
      Todos {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          Check
          projectID
          createdAt
          updatedAt
        }
        nextToken
      }
      Code {
        id
        codeURL
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      projectCodeId
      owner
    }
  }
`;
