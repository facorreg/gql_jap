import last from 'lodash/last';
import omit from 'lodash/omit';
import { getEnv, fetch } from 'utils';
import { KaExample } from 'models';

const exampleParser = ({
  word, furigana = '', meaning: exMeaning, audio: rawAudio,
}) => {
  /* utiliser la fonction avec laquelle on créera des mots */
  const audio = rawAudio?.aac || rawAudio?.mp3 || '';

  const ret = {
    type: 'ka_example',
    word,
    furigana: furigana.slice(0, -1),
    meaning: exMeaning?.english,
    audio: {
      audio,
      format: last(audio.split('.')),
    },
  };

  return ret;
};

const kanjiFormater = ({
  strokes,
  onyomi,
  kunyomi,
  video,
  radical,
  references,
}) => ({
  type: 'kanji',
  onyomi: onyomi?.katakana?.split('、') || 'N/A',
  kunyomi: kunyomi?.hiragana?.split('、') || 'N/A',
  strokes: omit(strokes, ['timings']),
  video: {
    poster: video?.poster,
    video: video?.webm || video?.mp4,
  },
  radical: (() => ({
    ...omit(radical, ['position']),
    name: radical?.name?.hiragana,
    meaning: radical?.meaning?.english,
  }))(),
  references,
});

const getKanjiAliveData = async (word) => {
  try {
    const args = {
      url: `${getEnv('KANJI_ALIVE_URL', '')}${word}`,
      headers: {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
          'x-rapidapi-key': getEnv('KANJI_ALIVE_API_KEY', ''),
        },
      },
    };

    const rawData = await fetch(args);

    const {
      kanji,
      radical,
      references,
      examples: rawExamples,
      error,
    } = rawData;

    if (error) return {};

    const examples = await Promise.all(
      rawExamples?.map(async ({ japanese, ...rest }) => {
        try {
          const [exWord, furigana = ''] = japanese.split('（');
          const currEx = await KaExample.findOne({ type: 'ka_example', word: exWord });
          if (currEx) return currEx.id;

          const newEx = new KaExample(exampleParser({ word: exWord, furigana, ...rest }));
          newEx.save();
          return Promise.resolve(newEx.id);
        } catch (err) {
          return Promise.reject(new Error('Failed to get Examples from local db'));
        }
      }),
    );

    const ret = {
      word: kanji?.character,
      meaning: kanji?.meaning?.english.split(', '),
      ...kanjiFormater({ ...kanji, radical, references }),
      examples,
    };

    return Promise.resolve(ret);

    // return Promise.resolve(parseKanjiAlive(response, word));
  } catch (err) {
    return Promise.reject(new Error('Failed to fetch KanjiAlive data'));
  }
};

export default getKanjiAliveData;
