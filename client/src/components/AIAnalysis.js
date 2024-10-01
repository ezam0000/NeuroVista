import React from 'react';

const AIAnalysis = ({ analysis }) => {
  const renderEntityList = (entities, title) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {entities.map((entity, index) => (
          <li key={index}>
            {entity.text} (Type: {entity.type}, Score: {entity.score.toFixed(2)})
            {entity.traits && entity.traits.length > 0 && (
              <ul>
                {entity.traits.map((trait, traitIndex) => (
                  <li key={traitIndex}>
                    {trait.name}: {trait.score.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h2>AI Analysis Results</h2>
      {renderEntityList(analysis.medicalConditions, 'Medical Conditions')}
      {renderEntityList(analysis.medications, 'Medications')}
      {renderEntityList(analysis.tests, 'Tests and Procedures')}
      {renderEntityList(analysis.anatomy, 'Anatomy')}
      {renderEntityList(analysis.timeExpressions, 'Time Expressions')}
    </div>
  );
};

export default AIAnalysis;