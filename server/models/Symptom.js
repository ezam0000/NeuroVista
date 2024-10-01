const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  severity: { type: Number, min: 1, max: 10 },
  // Add more fields as needed
});

module.exports = mongoose.model('Symptom', SymptomSchema);