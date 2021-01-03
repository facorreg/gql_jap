import {
  getSingleKanji,
  getMultipleKanji,
  getWord,
  getWords,
  getExamples,
} from './content';

import { me, getUser } from './user';

import { getUserDecks } from './cards';

const resolvers = {
  Query: {
    getKanji: (_, args) => getSingleKanji(args.word),
    getKanjiList: (_, args) => getMultipleKanji(args.ids),
    getWord: (_, args) => getWord(args.word),
    getWords: (_, args) => getWords(args.from, args.limit),
    getExamples: (_, args) => getExamples(args.ids),

    getUser: (_, args) => getUser(args.id),
    me: (_, __, ctx) => me(_, __, ctx.user),

    getUserDecks: (_, __, ctx) => getUserDecks(ctx?.user?.id),
  },
};

export default resolvers;
