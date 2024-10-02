const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { ComprehendMedicalClient, DetectEntitiesV2Command } = require("@aws-sdk/client-comprehendmedical");

console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('AWS Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');

const client = new ComprehendMedicalClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Patient routes
router.post('/patients', async (req, res) => {
  try {
    console.log('Received patient data:', req.body);
    const patient = new Patient(req.body);
    
    const params = {
      Text: `${patient.chiefComplaint} ${patient.symptoms} ${patient.medicalHistory}`
    };
    
    console.log('Sending text to AWS Comprehend Medical:', params.Text);
    const command = new DetectEntitiesV2Command(params);
    let analysis;
    try {
      analysis = await client.send(command);
    } catch (awsError) {
      console.error('AWS Comprehend Medical Error:', awsError);
      throw awsError;
    }
    
    console.log('Received analysis from AWS Comprehend Medical:', JSON.stringify(analysis, null, 2));
    const processedAnalysis = processAnalysisResults(analysis);
    
    patient.aiAnalysis = processedAnalysis;
    await patient.save();
    
    res.status(201).json({ patient, analysis: processedAnalysis });
  } catch (error) {
    console.error('Error creating patient or performing analysis:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation error details:', JSON.stringify(error.errors, null, 2));
    }
    res.status(500).json({ error: 'An error occurred while processing the patient data', details: error.message });
  }
});

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'An error occurred while fetching patients' });
  }
});

// Add more routes as needed

// New route for AI analysis
router.post('/analyze', async (req, res) => {
  try {
    const analysis = await performAIAnalysis(req.body);
    res.json(analysis);
  } catch (error) {
    console.error('Error performing AI analysis:', error);
    res.status(500).json({ error: 'An error occurred while performing AI analysis' });
  }
});

function processAnalysisResults(analysis) {
  const processedResults = {
    medicalConditions: [],
    medications: [],
    tests: [],
    anatomy: [],
    timeExpressions: [],
    protectedHealthInformation: [],
    behavioralEnvironmentalSocial: []
  };

  analysis.Entities.forEach(entity => {
    const processedEntity = {
      id: entity.Id,
      text: entity.Text,
      category: entity.Category,
      type: entity.Type,
      score: entity.Score,
      beginOffset: entity.BeginOffset,
      endOffset: entity.EndOffset,
      traits: entity.Traits ? entity.Traits.map(trait => ({
        name: trait.Name,
        score: trait.Score
      })) : [],
      attributes: entity.Attributes ? entity.Attributes.map(attr => ({
        type: attr.Type,
        score: attr.Score,
        relationshipScore: attr.RelationshipScore,
        relationshipType: attr.RelationshipType,
        id: attr.Id,
        text: attr.Text,
        category: attr.Category,
        traits: attr.Traits ? attr.Traits.map(trait => ({
          name: trait.Name,
          score: trait.Score
        })) : []
      })) : []
    };

    switch (entity.Category) {
      case 'MEDICAL_CONDITION':
        processedResults.medicalConditions.push(processedEntity);
        break;
      case 'MEDICATION':
        processedResults.medications.push(processedEntity);
        break;
      case 'TEST_TREATMENT_PROCEDURE':
        processedResults.tests.push(processedEntity);
        break;
      case 'ANATOMY':
        processedResults.anatomy.push(processedEntity);
        break;
      case 'TIME_EXPRESSION':
        processedResults.timeExpressions.push(processedEntity);
        break;
      case 'PROTECTED_HEALTH_INFORMATION':
        processedResults.protectedHealthInformation.push(processedEntity);
        break;
      default:
        processedResults.behavioralEnvironmentalSocial.push(processedEntity);
    }
  });

  return processedResults;
}

module.exports = router;