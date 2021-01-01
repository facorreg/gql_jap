import {
  getSingleKanji,
  getMultipleKanji,
  getWord,
  getWords,
  getExamples,
} from './content';

import { me } from './user';

const resolvers = {
  Query: {
    getKanji: (_, args) => getSingleKanji(args.word),
    getKanjiList: (_, args) => getMultipleKanji(args.ids),
    getWord: (_, args) => getWord(args.word),
    getWords: (_, args) => getWords(args.from, args.limit),
    getExamples: (_, args) => getExamples(args.ids),
    me: () => me,
  },
};

export default resolvers;
