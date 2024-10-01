import React, { useState } from 'react';
import { PatientForm } from './components/PatientForm';
import AIAnalysisResults from './components/AIAnalysisResults';
import LandingPage from './components/LandingPage';
import './styles/App.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handlePatientSubmit = (data) => {
    setAnalysisResult(data.analysis);
  };

  return (
    <div className="App">
      <h1>NeuroVista</h1>
      {!showPatientForm ? (
        <LandingPage onGetStarted={() => setShowPatientForm(true)} />
      ) : (
        <>
          <PatientForm onSubmit={handlePatientSubmit} />
          {analysisResult && <AIAnalysisResults analysis={analysisResult} />}
        </>
      )}
    </div>
  );
}

export default App;