import { gql } from 'apollo-server-koa';
import kanji from './kanji';
import word from './word';
import queries from './queries';

const schema = [
  kanji,
  word,
  queries,
].join('\n');

export default gql`${schema}`;
