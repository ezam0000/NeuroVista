import React from 'react';
import '../styles/MedicalLoadingBar.css';

const MedicalLoadingBar = () => {
  return (
    <div className="medical-loading-container">
      <div className="medical-loading-bar">
        <div className="medical-loading-progress"></div>
      </div>
      <p>Processing medical data...</p>
    </div>
  );
};

export default MedicalLoadingBar;