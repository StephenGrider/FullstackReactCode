const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);
