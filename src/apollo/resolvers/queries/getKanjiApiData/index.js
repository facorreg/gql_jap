import uniq from 'lodash/uniq';

import { Kanji } from 'models';
import getKanjiAlive from './getKanjiAlive';
import getKanjiApi from './getKanjiApi';

const getKanji = async (character) => {
  try {
    const kanjiAlive = await getKanjiAlive(character) || {};
    const kanjiApi = await getKanjiApi(character) || {};

    const takeFirstValidValue = (key, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      obj1?.[key] || obj2?.[key]
    );

    const mergeArrays = (key, link, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      uniq([...(obj1?.[key] || []), ...(obj2?.[key] || [])]).join(link)
    );

    const { examples } = kanjiAlive || {};
    const { strokes: kAliveStrokes, radical, video } = kanjiAlive || {};

    const { strokes: kApiStrokes } = kanjiApi || {};

    const merged = {
      character: takeFirstValidValue('word'),
      meaning: mergeArrays('meaning', ', '),
      onyomi: mergeArrays('onyomi', '、', kanjiAlive, kanjiApi),
      kunyomi: mergeArrays('kunyomi', '、', kanjiAlive, kanjiApi),
      video,
      strokes: {
        ...kAliveStrokes,
        count: takeFirstValidValue('count', kAliveStrokes, kApiStrokes),
      },
      radical,
      references: {
        ...kanjiAlive?.references,
        ...kanjiApi?.references,
      },
      examples,
    };

    return Promise.resolve(merged);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getSingleKanji = async (character, id) => {
  try {
    const kanji = await Kanji.findOne({
      $or: [{ character }, { _id: id }],
    });
    if (kanji) return Promise.resolve(kanji);

    const newKanji = new Kanji(await getKanji(character));
    newKanji.save();

    return Promise.resolve(newKanji);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getMultipleKanji = async (ids) => {
  try {
    const kanjiList = await Promise.all(ids.map((id) => getSingleKanji(null, id)));
    return Promise.resolve(kanjiList);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getSingleKanji, getMultipleKanji };
