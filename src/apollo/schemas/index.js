import { gql } from 'apollo-server-koa';
import {
  example,
  kanji,
  word,
  words,
} from './content';
import queries from './queries';

const schema = [
  example,
  kanji,
  word,
  words,
  queries,
].join('\n');

export default gql`${schema}`;
