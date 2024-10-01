import React, { useState } from 'react';
import '../styles/PatientForm.css';

function PatientForm({ onSubmit }) {
  const [patientData, setPatientData] = useState({
    name: '',
    dateOfBirth: '',
    chiefComplaint: '',
    symptoms: '',
    medicalHistory: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <div className="patient-form-container">
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="chiefComplaint">Chief Complaint:</label>
          <textarea
            id="chiefComplaint"
            name="chiefComplaint"
            value={patientData.chiefComplaint}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={patientData.symptoms}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History:</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={patientData.medicalHistory}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button">Submit Patient Data</button>
      </form>
    </div>
  );
}

export { PatientForm };