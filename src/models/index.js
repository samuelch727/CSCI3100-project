// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project, Todo, Code, Doc } = initSchema(schema);

export {
  Project,
  Todo,
  Code,
  Doc
};