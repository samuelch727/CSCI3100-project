/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
        codeURL
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          codeURL
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
      nextToken
    }
  }
`;
export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      codeURL
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
          codeURL
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
      nextToken
    }
  }
`;
export const getDoc = /* GraphQL */ `
  query GetDoc($id: ID!) {
    getDoc(id: $id) {
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
export const listDocs = /* GraphQL */ `
  query ListDocs(
    $filter: ModelDocFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          codeURL
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
        owner
      }
      nextToken
    }
  }
`;
