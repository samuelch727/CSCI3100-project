/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode($owner: String) {
    onCreateCode(owner: $owner) {
      id
      codeURL
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode($owner: String) {
    onUpdateCode(owner: $owner) {
      id
      codeURL
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode($owner: String) {
    onDeleteCode(owner: $owner) {
      id
      codeURL
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject($owner: String) {
    onCreateProject(owner: $owner) {
      id
      documents {
        items {
          id
          docURL
          docType
          projectID
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
      shareTo
      groupsCanAccess
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
          owner
        }
        nextToken
      }
      Code {
        id
        codeURL
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($owner: String) {
    onUpdateProject(owner: $owner) {
      id
      documents {
        items {
          id
          docURL
          docType
          projectID
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
      shareTo
      groupsCanAccess
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
          owner
        }
        nextToken
      }
      Code {
        id
        codeURL
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($owner: String) {
    onDeleteProject(owner: $owner) {
      id
      documents {
        items {
          id
          docURL
          docType
          projectID
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
      shareTo
      groupsCanAccess
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
          owner
        }
        nextToken
      }
      Code {
        id
        codeURL
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
export const onCreateDoc = /* GraphQL */ `
  subscription OnCreateDoc($owner: String) {
    onCreateDoc(owner: $owner) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateDoc = /* GraphQL */ `
  subscription OnUpdateDoc($owner: String) {
    onUpdateDoc(owner: $owner) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteDoc = /* GraphQL */ `
  subscription OnDeleteDoc($owner: String) {
    onDeleteDoc(owner: $owner) {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
      owner
    }
  }
`;
