import uniq from 'lodash/uniq';

import { Word } from 'models';
import { getKanjiAlive, getKanjiApi } from './getKanjiApiData';

const getKanji = async (word) => {
  try {
    const kanjiAlive = await getKanjiAlive(word) || {};
    const kanjiApi = await getKanjiApi(word) || {};

    const takeFirstValidValue = (key, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      obj1?.[key] || obj2?.[key]
    );

    const mergeArrays = (key, link, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      uniq([...(obj1?.[key] || []), ...(obj2?.[key] || [])]).join(link)
    );

    const kAliveKanji = kanjiAlive?.kanji || {};
    const kAliveStrokes = kAliveKanji?.strokes || {};

    const kApiKanji = kanjiApi?.kanji;
    const kApiStrokes = kApiKanji?.strokes;

    const merged = {
      type: 'kanji',
      // ...kanjiAlive, // default
      word: takeFirstValidValue('word'),
      meaning: mergeArrays('meaning', ', '),
      kanji: {
        ...kAliveKanji, // default
        onyomi: mergeArrays('onyomi', '、', kAliveKanji, kApiKanji),
        kunyomi: mergeArrays('kunyomi', '、', kAliveKanji, kApiKanji),
        strokes: {
          ...kAliveStrokes,
          count: takeFirstValidValue('count', kAliveStrokes, kApiStrokes),
        },
        references: {
          ...kAliveKanji?.references,
          ...kApiKanji?.references,
        },
      },
    };

    return Promise.resolve(merged);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getSingleKanji = async (options, word) => {
  try {
    const kanji = await Word.find({ type: 'kanji', ogWord: word });

    return kanji.length ? kanji : getKanji(word);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getSingleKanji;
