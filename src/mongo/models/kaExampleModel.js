import mongoose from 'mongoose';

const ExampleSchema = mongoose.Schema({
  type: String,
  word: String,
  furigana: String,
  meaning: String,
  audio: {
    audio: String,
    format: String,
  },
});

const Example = mongoose.model('ka_example', ExampleSchema);

export default Example;
