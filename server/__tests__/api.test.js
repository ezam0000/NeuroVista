const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const router = require('../routes/api');
require('dotenv').config();
const Patient = require('../models/Patient');

jest.setTimeout(30000); // Set timeout to 30 seconds

const app = express();
app.use(express.json());
app.use('/api', router);

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas test database');
    console.log('Database name:', mongoose.connection.name);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas test database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB Atlas test database and dropped the database');
  } catch (error) {
    console.error('Error dropping database:', error);
  }
});

beforeEach(async () => {
  try {
    await Patient.deleteMany({}); // Clear the database before each test
    await Patient.create({
      name: 'Test Patient',
      dateOfBirth: '1990-01-01',
      medicalHistory: 'Test history'
    });
    console.log('Database cleared and test patient created successfully');
  } catch (error) {
    console.error('Error in beforeEach:', error);
  }
});

describe('API Routes', () => {
  test('POST /api/patients should create a new patient', async () => {
    const newPatient = {
      name: 'Jane Smith',
      dateOfBirth: '1995-05-05',
      chiefComplaint: 'Severe headache',
      symptoms: 'Nausea, sensitivity to light',
      medicalHistory: 'No significant history'
    };

    try {
      console.log('Sending POST request with:', newPatient);
      const res = await request(app)
        .post('/api/patients')
        .send(newPatient);

      console.log('POST response status:', res.statusCode);
      console.log('POST response body:', res.body);

      expect(res.statusCode).toEqual(201);
      expect(res.body.patient).toHaveProperty('name', 'Jane Smith');
      expect(new Date(res.body.patient.dateOfBirth)).toEqual(new Date(newPatient.dateOfBirth));

      // Check that we now have 2 patients in total
      const allPatients = await Patient.find();
      expect(allPatients.length).toEqual(2);
    } catch (error) {
      console.error('Error in POST test:', error);
      throw error;
    }
  });

  test('GET /api/patients should return all patients', async () => {
    const res = await request(app).get('/api/patients');
    console.log('GET response status:', res.statusCode);
    console.log('GET response body:', res.body);

    expect(res.statusCode).toEqual(200);
    console.log('Total patients in GET response:', res.body.length);
    expect(res.body.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('POST /api/patients should create a new patient with full analysis', async () => {
    const newPatient = {
      name: 'Jane Smith',
      dateOfBirth: '1995-05-05',
      chiefComplaint: 'Severe headache',
      symptoms: 'Nausea, sensitivity to light',
      medicalHistory: 'No significant history'
    };

    try {
      const res = await request(app)
        .post('/api/patients')
        .send(newPatient);

      expect(res.statusCode).toEqual(201);
      expect(res.body.patient).toHaveProperty('name', 'Jane Smith');
      expect(new Date(res.body.patient.dateOfBirth)).toEqual(new Date(newPatient.dateOfBirth));

      // Check for AI analysis
      expect(res.body.patient.aiAnalysis).toBeDefined();
      expect(res.body.patient.aiAnalysis.medicalConditions).toBeDefined();
      expect(res.body.patient.aiAnalysis.medications).toBeDefined();
      expect(res.body.patient.aiAnalysis.tests).toBeDefined();
      expect(res.body.patient.aiAnalysis.anatomy).toBeDefined();
      expect(res.body.patient.aiAnalysis.timeExpressions).toBeDefined();

      // Check for diagnostic recommendations
      expect(res.body.patient.diagnosticRecommendations).toBeDefined();

      // Check for translated information
      expect(res.body.patient.translatedInfo).toBeDefined();
      expect(res.body.patient.translatedInfo.chiefComplaint).toBeDefined();
      expect(res.body.patient.translatedInfo.symptoms).toBeDefined();
      expect(res.body.patient.translatedInfo.medicalHistory).toBeDefined();

      // Verify in the database
      const savedPatient = await Patient.findOne({ name: 'Jane Smith' });
      expect(savedPatient).toBeDefined();
      expect(savedPatient.aiAnalysis).toBeDefined();
      expect(savedPatient.diagnosticRecommendations).toBeDefined();
      expect(savedPatient.translatedInfo).toBeDefined();
    } catch (error) {
      console.error('Error in POST test:', error);
      throw error;
    }
  });
});