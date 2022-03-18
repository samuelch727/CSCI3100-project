/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode {
    onCreateCode {
      id
      codeURL
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode {
    onUpdateCode {
      id
      codeURL
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode {
    onDeleteCode {
      id
      codeURL
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
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
export const onCreateDoc = /* GraphQL */ `
  subscription OnCreateDoc {
    onCreateDoc {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDoc = /* GraphQL */ `
  subscription OnUpdateDoc {
    onUpdateDoc {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDoc = /* GraphQL */ `
  subscription OnDeleteDoc {
    onDeleteDoc {
      id
      docURL
      docType
      projectID
      createdAt
      updatedAt
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
