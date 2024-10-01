import React from 'react';
import '../styles/AIAnalysisResults.css';

const AIAnalysisResults = ({ analysis }) => {
  const renderEntities = (entities, title) => (
    <div className="entity-group">
      <h3>{title}</h3>
      {entities.length > 0 ? (
        <ul>
          {entities.map((entity, index) => (
            <li key={index}>
              <strong>{entity.text}</strong> (Type: {entity.type}, Score: {entity.score.toFixed(2)})
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
      {renderEntities(analysis.medicalConditions, "Medical Conditions")}
      {renderEntities(analysis.medications, "Medications")}
      {renderEntities(analysis.tests, "Tests")}
      {renderEntities(analysis.anatomy, "Anatomy")}
      {renderEntities(analysis.timeExpressions, "Time Expressions")}
    </div>
  );
};

export default AIAnalysisResults;