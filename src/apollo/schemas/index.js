import { gql } from 'apollo-server-koa';
import kanji from './kanji';
import word from './word';
import words from './words';
import queries from './queries';

const schema = [
  kanji,
  word,
  words,
  queries,
].join('\n');

export default gql`${schema}`;
