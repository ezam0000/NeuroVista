import React from 'react';
import '../styles/AIAnalysisResults.css';
import '../styles/AIAnalysisResults.css';

const AIAnalysisResults = ({ analysis, diagnosticRecommendations, translated }) => {
  const renderEntities = (entities, title) => (
    <div className="entity-group">
      <h3>{title}</h3>
      {entities && entities.length > 0 ? (
        <ul>
          {entities.map((entity, index) => (
            <li key={index}>
              <strong>{entity.Text || entity.text}</strong> 
              (Type: {entity.Type || entity.type}, 
              Score: {(entity.Score || entity.score || 0).toFixed(2)})
              {entity.Traits && entity.Traits.length > 0 && (
                <ul>
                  {entity.Traits.map((trait, traitIndex) => (
                    <li key={traitIndex}>
                      {trait.Name}: {trait.Score.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()} detected.</p>
      )}
    </div>
  );

  const renderDiagnosticRecommendations = () => {
    if (!diagnosticRecommendations) return null;

    const recommendations = diagnosticRecommendations.split('\n\n');
    const intro = recommendations.shift();
    const footer = recommendations.pop();

    return (
      <div className="diagnostic-recommendations">
        <h3>Diagnostic Recommendations</h3>
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
      <h2>AI Analysis Results</h2>
      
      {renderDiagnosticRecommendations()}

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
    </div>
  );
};

export default AIAnalysisResults;