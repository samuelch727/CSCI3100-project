/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject($owner: String) {
    onCreateProject(owner: $owner) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($owner: String) {
    onUpdateProject(owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($owner: String) {
    onDeleteProject(owner: $owner) {
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
export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode($owner: String) {
    onCreateCode(owner: $owner) {
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
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode($owner: String) {
    onUpdateCode(owner: $owner) {
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
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode($owner: String) {
    onDeleteCode(owner: $owner) {
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
export const onCreateDoc = /* GraphQL */ `
  subscription OnCreateDoc($owner: String) {
    onCreateDoc(owner: $owner) {
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
export const onUpdateDoc = /* GraphQL */ `
  subscription OnUpdateDoc($owner: String) {
    onUpdateDoc(owner: $owner) {
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
export const onDeleteDoc = /* GraphQL */ `
  subscription OnDeleteDoc($owner: String) {
    onDeleteDoc(owner: $owner) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
