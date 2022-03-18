/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      codeURL
      createdAt
      updatedAt
    }
  }
`;
export const listCodes = /* GraphQL */ `
  query ListCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        codeURL
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
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
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getDoc = /* GraphQL */ `
  query GetDoc($id: ID!) {
    getDoc(id: $id) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const listDocs = /* GraphQL */ `
  query ListDocs(
    $filter: ModelDocFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        documents {
          nextToken
        }
        projectName
        language
        code
        todo
        runResult
        createTime
        Todos {
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
      nextToken
    }
  }
`;
