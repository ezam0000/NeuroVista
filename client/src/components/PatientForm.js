import React, { useState } from 'react';
import { generateRandomPatient } from '../utils';
import '../styles/PatientForm.css';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    chiefComplaint: '',
    symptoms: '',
    medicalHistory: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fillRandomData = () => {
    setFormData(generateRandomPatient());
  };

  const fillAndSubmitRandomData = () => {
    const randomData = generateRandomPatient();
    setFormData(randomData);
    onSubmit(randomData);
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>Patient Information</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="chiefComplaint">Chief Complaint:</label>
        <input
          type="text"
          id="chiefComplaint"
          name="chiefComplaint"
          value={formData.chiefComplaint}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="symptoms">Symptoms:</label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="medicalHistory">Medical History:</label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" onClick={fillRandomData} className="fill-btn">Fill Random Data</button>
        <button type="button" onClick={fillAndSubmitRandomData} className="fill-submit-btn">Fill and Submit Random Data</button>
      </div>
    </form>
  );
};

export default PatientForm;