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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
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
        <textarea
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="medicalHistory">Medical History:</label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
        />
      </div>

      <button type="button" onClick={fillRandomData}>Fill Random Data</button>
      <button type="button" onClick={fillAndSubmitRandomData}>Fill and Submit Random Data</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientForm;