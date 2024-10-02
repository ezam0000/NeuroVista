import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import AIAnalysisResults from './components/AIAnalysisResults';
import LandingPage from './components/LandingPage';
import './styles/App.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [diagnosticRecommendations, setDiagnosticRecommendations] = useState(null);
  const [translated, setTranslated] = useState(null);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handlePatientSubmit = async (data) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit patient data');
      }

      const result = await response.json();
      setAnalysisResult(result.analysis);
      setDiagnosticRecommendations(result.diagnosticRecommendations);
      setTranslated(result.translated);
    } catch (error) {
      console.error('Error submitting patient data:', error);
    }
  };

  return (
    <div className="App">
      <h1>NeuroVista</h1>
      {!showPatientForm ? (
        <LandingPage onGetStarted={() => setShowPatientForm(true)} />
      ) : (
        <>
          <PatientForm onSubmit={handlePatientSubmit} />
          {analysisResult && (
            <AIAnalysisResults 
              analysis={analysisResult} 
              diagnosticRecommendations={diagnosticRecommendations}
              translated={translated}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;