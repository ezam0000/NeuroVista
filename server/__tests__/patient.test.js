const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const patientRoutes = require('../routes/api');
require('dotenv').config();
const Patient = require('../models/Patient');

jest.setTimeout(30000); // Set timeout to 30 seconds

const app = express();
app.use(express.json());
app.use('/api', patientRoutes);

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
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error in beforeEach:', error);
  }
});

describe('Patient API', () => {
  it('should create a new patient with AI analysis', async () => {
    const newPatientData = {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      chiefComplaint: 'Severe headache and nausea',
      symptoms: 'Dizziness, sensitivity to light',
      medicalHistory: 'No significant medical history'
    };

    const response = await request(app)
      .post('/api/patients')
      .send(newPatientData)
      .expect(201);

    expect(response.body.patient).toBeDefined();
    expect(response.body.patient.name).toBe(newPatientData.name);
    expect(new Date(response.body.patient.dateOfBirth)).toEqual(new Date(newPatientData.dateOfBirth));
    expect(response.body.patient.chiefComplaint).toBe(newPatientData.chiefComplaint);
    expect(response.body.patient.symptoms).toBe(newPatientData.symptoms);
    expect(response.body.patient.medicalHistory).toBe(newPatientData.medicalHistory);

    expect(response.body.analysis).toBeDefined();
    expect(response.body.analysis.medicalConditions).toBeDefined();
    expect(response.body.analysis.anatomy).toBeDefined();

    // Check if the patient was actually saved in the database
    const savedPatient = await Patient.findOne({ name: newPatientData.name });
    expect(savedPatient).toBeDefined();
    expect(savedPatient.aiAnalysis).toBeDefined();
  });
});