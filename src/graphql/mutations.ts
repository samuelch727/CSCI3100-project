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
      shareTo
      docs {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      todos {
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
        }
        nextToken
      }
      code {
        id
        sourceCode
        project {
          id
          projectName
          language
          runResult
          shareTo
          createdAt
          updatedAt
          projectCodeId
          owner
        }
        createdAt
        updatedAt
        codeProjectId
        owner
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
      projectName
      language
      runResult
      shareTo
      docs {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      todos {
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
        }
        nextToken
      }
      code {
        id
        sourceCode
        project {
          id
          projectName
          language
          runResult
          shareTo
          createdAt
          updatedAt
          projectCodeId
          owner
        }
        createdAt
        updatedAt
        codeProjectId
        owner
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
      projectName
      language
      runResult
      shareTo
      docs {
        items {
          docURL
          docType
          projectID
          id
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      todos {
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
        }
        nextToken
      }
      code {
        id
        sourceCode
        project {
          id
          projectName
          language
          runResult
          shareTo
          createdAt
          updatedAt
          projectCodeId
          owner
        }
        createdAt
        updatedAt
        codeProjectId
        owner
      }
      createdAt
      updatedAt
      projectCodeId
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
      sourceCode
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      codeProjectId
      owner
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
      sourceCode
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      codeProjectId
      owner
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
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      owner
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
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
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
      sourceCode
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      codeProjectId
      owner
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
      project {
        id
        projectName
        language
        runResult
        shareTo
        docs {
          nextToken
        }
        todos {
          nextToken
        }
        code {
          id
          sourceCode
          createdAt
          updatedAt
          codeProjectId
          owner
        }
        createdAt
        updatedAt
        projectCodeId
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
