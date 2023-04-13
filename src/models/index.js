// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Expense, Trip, User } = initSchema(schema);

export {
  Note,
  Expense,
  Trip,
  User
};