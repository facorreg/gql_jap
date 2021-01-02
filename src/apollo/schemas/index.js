import { gql } from 'apollo-server-koa';
import {
  example,
  kanji,
  word,
  words,
} from './content';
import {
  user,
} from './user';
import {
  decks,
} from './cards';

import input from './input';
import queries from './queries';
import mutations from './mutations';

const schema = [
  example,
  kanji,
  word,
  words,
  user,
  input,
  decks,
  queries,
  mutations,
].join('\n');

export default gql`${schema}`;
