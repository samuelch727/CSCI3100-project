/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      codeURL
      grpsCanAccess
      isPublic
      createdAt
      updatedAt
      owner
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
        grpsCanAccess
        isPublic
        createdAt
        updatedAt
        owner
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
      check
      projectID
      grpsCanAccess
      isPublic
      createdAt
      updatedAt
      owner
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
        check
        projectID
        grpsCanAccess
        isPublic
        createdAt
        updatedAt
        owner
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
          grpsCanAccess
          isPublic
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      projectName
      language
      code
      todo
      runResult
      createTime
      grpsCanAccess
      isPublic
      Todos {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          check
          projectID
          grpsCanAccess
          isPublic
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Code {
        id
        codeURL
        grpsCanAccess
        isPublic
        createdAt
        updatedAt
        owner
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
        grpsCanAccess
        isPublic
        Todos {
          nextToken
        }
        Code {
          id
          codeURL
          grpsCanAccess
          isPublic
          createdAt
          updatedAt
          owner
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
export const getDoc = /* GraphQL */ `
  query GetDoc($id: ID!) {
    getDoc(id: $id) {
      id
      docURL
      docType
      projectID
      grpsCanAccess
      isPublic
      createdAt
      updatedAt
      owner
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
        grpsCanAccess
        isPublic
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
