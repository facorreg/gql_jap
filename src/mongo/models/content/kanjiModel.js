import mongoose from 'mongoose';

const kanjiSchema = mongoose.Schema({
  character: String,
  meaning: String,
  onyomi: String,
  kunyomi: String,
  strokes: {
    count: Number,
    images: [String],
  },
  video: {
    poster: String,
    video: String,
  },
  examples: [mongoose.Schema.Types.ObjectId],
  references: {
    jlpt: Number,
    grade: Number,
    kodansha: String,
    classic_nelson: String,
  },
});

const Kanji = mongoose.model('Kanji', kanjiSchema);

export default Kanji;
