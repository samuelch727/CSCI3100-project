/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      code
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        code
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCodes = /* GraphQL */ `
  query SyncCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        code
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTodos = /* GraphQL */ `
  query SyncTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        todoURL
        todoTitle
        lineNumber
        check
        projectID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      projectName
      language
      code
      todo
      runResult
      createTime
      shareTo
      Todos {
        items {
          id
          todoURL
          todoTitle
          lineNumber
          check
          projectID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      Code {
        id
        code
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        projectName
        language
        code
        todo
        runResult
        createTime
        shareTo
        Todos {
          nextToken
          startedAt
        }
        Code {
          id
          code
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        projectCodeId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        documents {
          nextToken
          startedAt
        }
        projectName
        language
        code
        todo
        runResult
        createTime
        shareTo
        Todos {
          nextToken
          startedAt
        }
        Code {
          id
          code
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        projectCodeId
        owner
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDocs = /* GraphQL */ `
  query SyncDocs(
    $filter: ModelDocFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        docURL
        docType
        projectID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
