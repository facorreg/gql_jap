import mongoose from 'mongoose';

const connect = (db) => mongoose.connect(`mongodb://localhost/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

export default connect;
