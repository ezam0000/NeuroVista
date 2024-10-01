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

let connection;

beforeAll(async () => {
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas test database');
    console.log('Database name:', connection.connection.name);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas test database:', error);
    throw error;
  }
});

afterAll(async () => {
  if (connection) {
    try {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
      console.log('Disconnected from MongoDB Atlas test database and dropped the database');
    } catch (error) {
      console.error('Error dropping database:', error);
    }
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

afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
});

describe('API Routes', () => {
  it('POST /api/patients should create a new patient', async () => {
    const newPatient = {
      name: 'Jane Smith',
      dateOfBirth: '1995-05-05',
      medicalHistory: 'None'
    };
    console.log('Sending POST request with:', newPatient);
    try {
      const res = await request(app)
        .post('/api/patients')
        .send(newPatient);
      console.log('POST response status:', res.statusCode);
      console.log('POST response body:', res.body);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Jane Smith');

      // Check that we now have 2 patients in total
      const allPatients = await Patient.find();
      console.log('Total patients after POST:', allPatients.length);
      expect(allPatients.length).toEqual(2);
    } catch (error) {
      console.error('Error in POST test:', error);
      throw error;
    }
  });

  it('GET /api/patients should return all patients', async () => {
    try {
      // Create a new patient
      await Patient.create({
        name: 'Jane Smith',
        dateOfBirth: '1995-05-05',
        medicalHistory: 'None'
      });

      const res = await request(app).get('/api/patients');
      console.log('GET response status:', res.statusCode);
      console.log('GET response body:', res.body);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      console.log('Total patients in GET response:', res.body.length);
      expect(res.body.length).toEqual(2);
      
      const patientNames = res.body.map(patient => patient.name);
      expect(patientNames).toContain('Test Patient');
      expect(patientNames).toContain('Jane Smith');
    } catch (error) {
      console.error('Error in GET test:', error);
      throw error;
    }
  });
});