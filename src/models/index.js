// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Code, Todo, Project, Doc } = initSchema(schema);

export {
  Code,
  Todo,
  Project,
  Doc
};