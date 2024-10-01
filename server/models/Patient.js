const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  id: Number,
  text: String,
  category: String,
  type: String,
  score: Number,
  beginOffset: Number,
  endOffset: Number,
  traits: [{ name: String, score: Number }],
  attributes: [{
    type: String,
    score: Number,
    text: String,
    beginOffset: Number,
    endOffset: Number
  }]
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  medicalHistory: { type: String },
  chiefComplaint: { type: String },
  symptoms: { type: String },
  aiAnalysis: {
    medicalConditions: [EntitySchema],
    medications: [EntitySchema],
    tests: [EntitySchema],
    anatomy: [EntitySchema],
    timeExpressions: [EntitySchema]
  }
});

module.exports = mongoose.model('Patient', PatientSchema);