const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { ComprehendMedicalClient, DetectEntitiesV2Command } = require("@aws-sdk/client-comprehendmedical");
const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require("openai");

console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('AWS Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');

const client = new ComprehendMedicalClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID.trim(),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.trim(),
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.replace(/^Bearer\s+/i, '').trim(),
});

if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Please set OPENAI_API_KEY in your environment variables.');
  process.exit(1);
}

async function translateToEnglish(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a medical translator. Translate the following text to English:" },
      { role: "user", content: text }
    ],
  });
  return response.choices[0].message.content.trim();
}

async function getDiagnosticRecommendations(symptoms, medicalHistory) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an AI medical assistant. Based on the following symptoms and medical history, provide potential diagnostic recommendations for a doctor to review:" },
      { role: "user", content: `Symptoms: ${symptoms}\nMedical History: ${medicalHistory}` }
    ],
  });
  return response.choices[0].message.content.trim();
}

// Patient routes
router.post('/patients', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Request headers:', req.headers);

    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      console.error('Invalid or empty request body received');
      return res.status(400).json({ error: 'Invalid or empty request body' });
    }

    // Check if required fields are present
    if (!req.body.name || !req.body.dateOfBirth) {
      console.error('Missing required fields:', { name: req.body.name, dateOfBirth: req.body.dateOfBirth });
      return res.status(400).json({ error: 'Name and date of birth are required fields' });
    }

    const patient = new Patient({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      chiefComplaint: req.body.chiefComplaint || '',
      symptoms: req.body.symptoms || '',
      medicalHistory: req.body.medicalHistory || ''
    });

    console.log('Created patient object:', JSON.stringify(patient));

    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY.substring(0, 10) + '...');

    let translatedChiefComplaint = patient.chiefComplaint;
    let translatedSymptoms = patient.symptoms;
    let translatedMedicalHistory = patient.medicalHistory;
    let originalChiefComplaint = patient.chiefComplaint;
    let originalSymptoms = patient.symptoms;
    let originalMedicalHistory = patient.medicalHistory;

    try {
      if (patient.chiefComplaint && !/^[a-zA-Z\s]+$/.test(patient.chiefComplaint)) {
        console.log('Translating to English...');
        translatedChiefComplaint = await translateToEnglish(patient.chiefComplaint);
        translatedSymptoms = await translateToEnglish(patient.symptoms);
        translatedMedicalHistory = await translateToEnglish(patient.medicalHistory);
      } else if (patient.chiefComplaint) {
        console.log('Translating to Spanish...');
        originalChiefComplaint = await translateToLanguage(patient.chiefComplaint, 'es');
        originalSymptoms = await translateToLanguage(patient.symptoms, 'es');
        originalMedicalHistory = await translateToLanguage(patient.medicalHistory, 'es');
      }
      console.log('Translation completed successfully');
    } catch (translationError) {
      console.error('Translation error:', translationError);
      // Continue with original text
    }

    const params = {
      Text: `${translatedChiefComplaint} ${translatedSymptoms} ${translatedMedicalHistory}`.trim()
    };

    console.log('Sending text to AWS Comprehend Medical:', params.Text);
    const command = new DetectEntitiesV2Command(params);
    let analysis;
    try {
      analysis = await client.send(command);
    } catch (awsError) {
      console.error('AWS Comprehend Medical Error:', awsError);
      return res.status(500).json({ error: 'AWS Comprehend Medical failed', details: awsError.message });
    }
    
    console.log('Received analysis from AWS Comprehend Medical:', JSON.stringify(analysis, null, 2));
    const processedAnalysis = processAnalysisResults(analysis);
    
    patient.aiAnalysis = processedAnalysis;

    try {
      const diagnosticRecommendations = await getDiagnosticRecommendations(translatedSymptoms, translatedMedicalHistory);
      patient.diagnosticRecommendations = diagnosticRecommendations;
    } catch (recommendationsError) {
      console.error('Error getting diagnostic recommendations:', recommendationsError);
      patient.diagnosticRecommendations = 'Unable to generate recommendations at this time.';
    }

    patient.translatedInfo = {
      chiefComplaint: translatedChiefComplaint,
      symptoms: translatedSymptoms,
      medicalHistory: translatedMedicalHistory,
      originalChiefComplaint: originalChiefComplaint,
      originalSymptoms: originalSymptoms,
      originalMedicalHistory: originalMedicalHistory
    };

    try {
      const savedPatient = await patient.save({ maxTimeMS: 60000 });
      console.log('Patient saved successfully:', savedPatient._id);
      res.status(201).json({ 
        patient: savedPatient, 
        analysis: processedAnalysis, 
        diagnosticRecommendations: savedPatient.diagnosticRecommendations,
        translated: savedPatient.translatedInfo
      });
    } catch (saveError) {
      console.error('Error saving patient to database:', saveError);
      if (saveError.name === 'MongooseError' && saveError.message.includes('buffering timed out')) {
        return res.status(503).json({ error: 'Database connection timed out', details: 'Please try again later' });
      }
      return res.status(500).json({ error: 'Failed to save patient', details: saveError.message });
    }
  } catch (error) {
    console.error('Error creating patient or performing analysis:', error);
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
    const patientInfo = req.body;
    const amazonResults = await analyzeText(patientInfo);
    const processedResults = processAnalysisResults(amazonResults);
    
    const openAIPrompt = prepareOpenAIPrompt(patientInfo, processedResults);
    const openAIResponse = await generateOpenAIResponse(openAIPrompt);
    
    res.json({
      amazonResults: processedResults,
      diagnosticRecommendations: openAIResponse
    });
  } catch (error) {
    console.error('Error in /analyze route:', error);
    res.status(500).json({ error: 'An error occurred during analysis' });
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

function prepareOpenAIPrompt(patientInfo, amazonResults) {
  let prompt = `Based on the following patient information and Amazon Comprehend Medical analysis results, provide a detailed diagnostic recommendation:\n\n`;
  prompt += `Patient Information:\n`;
  prompt += `Chief Complaint: ${patientInfo.chiefComplaint}\n`;
  prompt += `Symptoms: ${patientInfo.symptoms}\n`;
  prompt += `Medical History: ${patientInfo.medicalHistory}\n\n`;
  
  prompt += `Amazon Comprehend Medical Analysis:\n`;
  
  const entityTypes = ['medicalConditions', 'medications', 'tests', 'anatomy', 'timeExpressions'];
  
  entityTypes.forEach(type => {
    if (amazonResults[type] && amazonResults[type].length > 0) {
      prompt += `${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
      amazonResults[type].forEach(entity => {
        prompt += `- ${entity.text} (Type: ${entity.type}, Score: ${entity.score.toFixed(2)})\n`;
        if (entity.traits && entity.traits.length > 0) {
          entity.traits.forEach(trait => {
            prompt += `  - ${trait.name}: ${trait.score.toFixed(2)}\n`;
          });
        }
      });
      prompt += '\n';
    }
  });
  
  prompt += `Based on this information, provide a detailed diagnostic recommendation, including potential conditions to consider, suggested tests or procedures, and any additional information that might be relevant for the healthcare provider.`;
  
  return prompt;
}

router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    const translatedText = await translateToLanguage(text, targetLanguage);
    res.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'An error occurred during translation' });
  }
});

async function translateToLanguage(text, targetLanguage) {
  if (!text || text.trim() === '') {
    console.log(`Attempted to translate empty or null text to ${targetLanguage}`);
    return '';
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: `You are a medical translator. Translate the following text to ${targetLanguage}:` },
        { role: "user", content: text }
      ],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Translation failed: ${error.message}`);
  }
}

module.exports = router;