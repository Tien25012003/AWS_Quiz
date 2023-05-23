// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { USER } = initSchema(schema);

export {
  USER
};