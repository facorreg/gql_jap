import last from 'lodash/last';
import omit from 'lodash/omit';
import { getEnv, fetch } from 'utils';

const exampleParser = ({ japanese, meaning: exMeaning, audio: rawAudio }) => {
  /* utiliser la fonction avec laquelle on créera des mots */
  const [exWord, furigana = ''] = japanese.split('（');
  const audio = rawAudio?.aac || rawAudio?.mp3 || '';

  const ret = {
    type: 'word',
    word: exWord,
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
  onyomi: onyomi?.katakana?.split('、') || 'N/A',
  kunyomi: kunyomi?.hiragana?.split('、') || 'N/A',
  strokes: omit(strokes, ['timings']),
  video: {
    poster: video?.poster,
    video: video?.webm || video?.mp4,
  },
  radical,
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
    } = rawData;

    const ret = {
      word: kanji?.character,
      meaning: kanji?.meaning?.english.split(', '),
      kanji: kanjiFormater({ ...kanji, radical, references }),
      examples: rawExamples.map(exampleParser),
    };

    return Promise.resolve(ret);

    // return Promise.resolve(parseKanjiAlive(response, word));
  } catch (err) {
    return Promise.reject(new Error('Failed to fetch KanjiAlive data'));
  }
};

export default getKanjiAliveData;
