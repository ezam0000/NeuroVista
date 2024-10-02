const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  Id: Number,
  Text: String,
  Category: String,
  Type: String,
  Score: Number,
  BeginOffset: Number,
  EndOffset: Number,
  Traits: [{ Name: String, Score: Number }],
  Attributes: [{
    Type: String,
    Score: Number,
    RelationshipScore: Number,
    RelationshipType: String,
    Id: Number,
    BeginOffset: Number,
    EndOffset: Number,
    Text: String,
    Category: String,
    Traits: [{ Name: String, Score: Number }]
  }]
}, { _id: false, strict: false });

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
    timeExpressions: [EntitySchema],
    protectedHealthInformation: [EntitySchema],
    behavioralEnvironmentalSocial: [EntitySchema]
  }
});

module.exports = mongoose.model('Patient', PatientSchema);