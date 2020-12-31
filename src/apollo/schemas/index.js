import { gql } from 'apollo-server-koa';
import example from './example';
import kanji from './kanji';
import word from './word';
import words from './words';
import queries from './queries';

const schema = [
  kanji,
  word,
  words,
  example,
  queries,
].join('\n');

export default gql`${schema}`;
