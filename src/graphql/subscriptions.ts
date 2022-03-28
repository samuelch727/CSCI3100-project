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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($owner: String) {
    onUpdateProject(owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($owner: String) {
    onDeleteProject(owner: $owner) {
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
export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode($owner: String, $shareTo: String) {
    onCreateCode(owner: $owner, shareTo: $shareTo) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode($owner: String, $shareTo: String) {
    onUpdateCode(owner: $owner, shareTo: $shareTo) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode($owner: String, $shareTo: String) {
    onDeleteCode(owner: $owner, shareTo: $shareTo) {
      id
      codeURL
      createdAt
      updatedAt
      owner
      shareTo
    }
  }
`;
export const onCreateDoc = /* GraphQL */ `
  subscription OnCreateDoc($owner: String, $shareTo: String) {
    onCreateDoc(owner: $owner, shareTo: $shareTo) {
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
export const onUpdateDoc = /* GraphQL */ `
  subscription OnUpdateDoc($owner: String, $shareTo: String) {
    onUpdateDoc(owner: $owner, shareTo: $shareTo) {
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
export const onDeleteDoc = /* GraphQL */ `
  subscription OnDeleteDoc($owner: String, $shareTo: String) {
    onDeleteDoc(owner: $owner, shareTo: $shareTo) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String, $shareTo: String) {
    onCreateTodo(owner: $owner, shareTo: $shareTo) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String, $shareTo: String) {
    onUpdateTodo(owner: $owner, shareTo: $shareTo) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String, $shareTo: String) {
    onDeleteTodo(owner: $owner, shareTo: $shareTo) {
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
