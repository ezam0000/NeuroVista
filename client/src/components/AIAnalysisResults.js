import React from 'react';
import '../styles/AIAnalysisResults.css';

const AIAnalysisResults = ({ analysis, diagnosticRecommendations, translated }) => {
  const renderTraits = (traits) => (
    <ul>
      {traits.map((trait, index) => (
        <li key={index}>{trait.name}: {trait.score.toFixed(2)}</li>
      ))}
    </ul>
  );

  const renderAttributes = (attributes) => (
    <ul>
      {attributes.map((attr, index) => (
        <li key={index}>
          {attr.type}: {attr.text} (Score: {attr.score.toFixed(2)})
          {attr.traits && attr.traits.length > 0 && renderTraits(attr.traits)}
        </li>
      ))}
    </ul>
  );

  const renderEntities = (entities, title) => (
    <div className="entity-group">
      <h3>{title}</h3>
      {entities.length > 0 ? (
        <ul>
          {entities.map((entity, index) => (
            <li key={index}>
              <strong>{entity.text}</strong> (Type: {entity.type}, Score: {entity.score.toFixed(2)})
              {entity.traits && entity.traits.length > 0 && (
                <div>
                  <strong>Traits:</strong>
                  {renderTraits(entity.traits)}
                </div>
              )}
              {entity.attributes && entity.attributes.length > 0 && (
                <div>
                  <strong>Attributes:</strong>
                  {renderAttributes(entity.attributes)}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()} detected.</p>
      )}
    </div>
  );

  return (
    <div className="ai-analysis-results">
      <h2>AI Analysis Results</h2>
      {translated && (
        <div className="translation-results">
          <h3>Translated Information</h3>
          <p><strong>Chief Complaint:</strong> {translated.chiefComplaint}</p>
          <p><strong>Symptoms:</strong> {translated.symptoms}</p>
          <p><strong>Medical History:</strong> {translated.medicalHistory}</p>
        </div>
      )}
      {renderEntities(analysis.medicalConditions, "Medical Conditions")}
      {renderEntities(analysis.medications, "Medications")}
      {renderEntities(analysis.tests, "Tests")}
      {renderEntities(analysis.anatomy, "Anatomy")}
      {renderEntities(analysis.timeExpressions, "Time Expressions")}
      {diagnosticRecommendations && (
        <div className="diagnostic-recommendations">
          <h3>Diagnostic Recommendations</h3>
          <p>{diagnosticRecommendations}</p>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisResults;