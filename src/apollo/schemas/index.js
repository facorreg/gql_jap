import { gql } from 'apollo-server-koa';
import shared from './shared';
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
  cards,
} from './cards';

import input from './input';
import queries from './queries';
import mutations from './mutations';

const schema = [
  shared,
  example,
  kanji,
  word,
  words,
  user,
  input,
  cards,
  decks,
  queries,
  mutations,
].join('\n');

export default gql`${schema}`;
