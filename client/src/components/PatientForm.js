import React, { useState } from 'react';
import { generateRandomPatient } from '../utils';
import '../styles/PatientForm.css';
import MedicalLoadingBar from './MedicalLoadingBar';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    chiefComplaint: '',
    symptoms: '',
    medicalHistory: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const fillRandomData = () => {
    setFormData(generateRandomPatient());
  };

  // Remove the fillAndSubmitRandomData function as it's no longer needed

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
        <button
          type="button"
          onClick={fillRandomData}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Generate Sample Patient
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
          {!isSubmitting && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="btn-icon"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-4 4 4 4v-3h6v-2h-6zm8-9l-4-4v3H9v2h6v3l4-4z" />
            </svg>
          )}
        </button>
      </div>
      {isSubmitting && <MedicalLoadingBar />}
    </form>
  );
};

export default PatientForm;