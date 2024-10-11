import React, { useState, useEffect } from 'react';
import '../styles/AIAnalysisResults.css';

const AIAnalysisResults = ({ analysis, diagnosticRecommendations, translated }) => {
  const [isSpanish, setIsSpanish] = useState(false);
  const [translatedDiagnosticRecommendations, setTranslatedDiagnosticRecommendations] = useState('');

  useEffect(() => {
    if (isSpanish && diagnosticRecommendations) {
      translateText(diagnosticRecommendations, 'es').then(setTranslatedDiagnosticRecommendations);
    }
  }, [isSpanish, diagnosticRecommendations]);

  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, targetLanguage }),
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const renderEntities = (entities, title, icon) => (
    <div className="entity-tile">
      <h3><i className={`fas ${icon}`}></i> {title}</h3>
      {entities && entities.length > 0 ? (
        <ul className="entity-list">
          {entities.map((entity, index) => (
            <li key={index} className="entity-item">
              <span className="entity-text">{entity.Text || entity.text}</span>
              <span className="entity-type">{entity.Type || entity.type}</span>
              <span className="entity-score">{(entity.Score || entity.score || 0).toFixed(2)}</span>
              {entity.Traits && entity.Traits.length > 0 && (
                <ul className="trait-list">
                  {entity.Traits.map((trait, traitIndex) => (
                    <li key={traitIndex} className="trait-item">
                      <span className="trait-name">{trait.Name}</span>
                      <span className="trait-score">{trait.Score.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-entities">No {title.toLowerCase()} detected.</p>
      )}
    </div>
  );

  const renderDiagnosticRecommendations = () => {
    if (!diagnosticRecommendations) return null;

    const recommendations = (isSpanish ? translatedDiagnosticRecommendations : diagnosticRecommendations).split('\n\n');
    const intro = recommendations.shift();
    const footer = recommendations.pop();

    return (
      <div className="diagnostic-tile">
        <h3>
          <i className="fas fa-stethoscope"></i> Diagnostic Recommendations
          <button onClick={toggleLanguage} className="language-toggle">
            {isSpanish ? 'Ver en inglés' : 'Ver en español'}
          </button>
        </h3>
        <p className="recommendation-intro">{intro}</p>
        <ol className="recommendation-list">
          {recommendations.map((rec, index) => {
            const [title, ...description] = rec.split(':');
            return (
              <li key={index} className="recommendation-item">
                <h4>{title.trim()}</h4>
                <p>{description.join(':').trim()}</p>
              </li>
            );
          })}
        </ol>
        {footer && <p className="recommendation-footer">{footer}</p>}
      </div>
    );
  };

  return (
    <div className="ai-analysis-results">
      <h2 className="results-title">AI Analysis Results</h2>
      
      <div className="results-grid">
        {renderDiagnosticRecommendations()}

        {translated && (
          <div className="translation-tile">
            <h3><i className="fas fa-language"></i> Translated Information</h3>
            <p><strong>{isSpanish ? 'Queja principal:' : 'Chief Complaint:'}</strong> {isSpanish ? translated.chiefComplaint : translated.originalChiefComplaint}</p>
            <p><strong>{isSpanish ? 'Síntomas:' : 'Symptoms:'}</strong> {isSpanish ? translated.symptoms : translated.originalSymptoms}</p>
            <p><strong>{isSpanish ? 'Historia médica:' : 'Medical History:'}</strong> {isSpanish ? translated.medicalHistory : translated.originalMedicalHistory}</p>
            <button onClick={toggleLanguage} className="language-toggle">
              {isSpanish ? 'View in English' : 'Ver en español'}
            </button>
          </div>
        )}

        {renderEntities(analysis.medicalConditions, "Medical Conditions", "fa-heartbeat")}
        {renderEntities(analysis.medications, "Medications", "fa-pills")}
        {renderEntities(analysis.tests, "Tests", "fa-vial")}
        {renderEntities(analysis.anatomy, "Anatomy", "fa-user-md")}
        {renderEntities(analysis.timeExpressions, "Time Expressions", "fa-clock")}
      </div>
    </div>
  );
};

export default AIAnalysisResults;