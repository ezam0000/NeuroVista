import { faker } from '@faker-js/faker';

const chiefComplaints = [
  "Severe headache with nausea",
  "Chest pain and shortness of breath",
  "Persistent lower back pain",
  "Abdominal pain and bloating",
  "Chronic fatigue and weakness",
  "Recurrent joint pain and stiffness",
  "Unexplained weight loss",
  "Difficulty sleeping and daytime drowsiness",
  "Frequent urination and excessive thirst",
  "Skin rash and itching"
];

const symptoms = [
  "Fatigue", "Dizziness", "Nausea", "Fever", "Chills", "Sweating", "Loss of appetite",
  "Insomnia", "Muscle aches", "Sore throat", "Cough", "Runny nose", "Shortness of breath",
  "Chest pain", "Heart palpitations", "Abdominal pain", "Bloating", "Constipation", "Diarrhea",
  "Joint pain", "Muscle weakness", "Numbness", "Tingling sensations", "Headache", "Blurred vision",
  "Ringing in ears", "Loss of balance", "Mood swings", "Anxiety", "Depression"
];

const medicalConditions = [
  "Hypertension", "Type 2 Diabetes", "Asthma", "Osteoarthritis", "Rheumatoid Arthritis",
  "Migraine", "Generalized Anxiety Disorder", "Major Depressive Disorder", "Hypothyroidism",
  "Hyperthyroidism", "Gastroesophageal Reflux Disease (GERD)", "Osteoporosis", "Chronic Obstructive Pulmonary Disease (COPD)",
  "Coronary Artery Disease", "Atrial Fibrillation", "Chronic Kidney Disease", "Hepatitis C",
  "HIV/AIDS", "Multiple Sclerosis", "Parkinson's Disease", "Alzheimer's Disease", "Epilepsy",
  "Psoriasis", "Crohn's Disease", "Ulcerative Colitis", "Fibromyalgia", "Lupus"
];

const medications = [
  "Lisinopril", "Metformin", "Amlodipine", "Metoprolol", "Omeprazole", "Gabapentin",
  "Sertraline", "Escitalopram", "Levothyroxine", "Atorvastatin", "Albuterol", "Losartan",
  "Hydrocodone/Acetaminophen", "Pantoprazole", "Furosemide", "Fluoxetine", "Insulin Glargine",
  "Bupropion", "Trazodone", "Duloxetine", "Rosuvastatin", "Montelukast", "Venlafaxine",
  "Carvedilol", "Pregabalin"
];

const allergies = [
  "Penicillin", "Sulfa drugs", "Aspirin", "Ibuprofen", "Latex", "Peanuts", "Tree nuts",
  "Shellfish", "Eggs", "Milk", "Soy", "Wheat", "Fish", "Sesame", "Bee stings", "Pollen",
  "Dust mites", "Mold", "Animal dander", "Nickel"
];

const familyHistoryConditions = [
  "Heart disease", "Stroke", "Diabetes", "Cancer", "Hypertension", "Alzheimer's disease",
  "Parkinson's disease", "Rheumatoid arthritis", "Lupus", "Multiple sclerosis", "Celiac disease",
  "Crohn's disease", "Ulcerative colitis", "Asthma", "Eczema", "Psoriasis", "Depression",
  "Bipolar disorder", "Schizophrenia", "Alcoholism"
];

const socialHabits = [
  { smoking: ["Never smoked", "Former smoker", "Current smoker (< 1 pack/day)", "Current smoker (> 1 pack/day)"] },
  { alcohol: ["Non-drinker", "Social drinker", "Moderate drinker", "Heavy drinker"] },
  { exercise: ["Sedentary", "Light exercise 1-2 times/week", "Moderate exercise 3-4 times/week", "Active lifestyle with daily exercise"] },
  { diet: ["Balanced diet", "Vegetarian", "Vegan", "Keto", "Low-carb", "Mediterranean", "Fast food frequently"] },
  { stress: ["Low stress levels", "Moderate stress", "High stress", "Extreme stress"] },
  { sleep: ["7-9 hours/night", "6-7 hours/night", "5-6 hours/night", "Less than 5 hours/night", "Irregular sleep pattern"] }
];

const generateDetailedMedicalHistory = (pastConditions) => {
  let history = pastConditions.map(condition => {
    const yearDiagnosed = faker.date.past({ years: 20 }).getFullYear();
    const status = faker.helpers.arrayElement(["well-controlled", "poorly controlled", "in remission"]);
    return `${condition} (diagnosed in ${yearDiagnosed}, currently ${status})`;
  }).join(". ");

  const surgeries = faker.helpers.maybe(() => {
    const surgeryCount = faker.number.int({ min: 1, max: 3 });
    const surgeryList = Array.from({ length: surgeryCount }, () => 
      `${faker.helpers.arrayElement(["Appendectomy", "Cholecystectomy", "Hernia repair", "Tonsillectomy", "Knee arthroscopy"])} in ${faker.date.past({ years: 15 }).getFullYear()}`
    );
    return "Surgical history: " + surgeryList.join(", ") + ". ";
  }, { probability: 0.4 });

  return `Medical History: ${history}${surgeries || ''}`;
};

const generateFamilyHistory = () => {
  const familyMembers = ["Mother", "Father", "Sibling", "Grandparent"];
  const history = familyMembers.map(member => {
    if (faker.datatype.boolean(0.7)) {
      const conditions = faker.helpers.arrayElements(familyHistoryConditions, { min: 1, max: 3 });
      return `${member}: ${conditions.join(", ")}`;
    }
    return null;
  }).filter(Boolean);

  return history.length > 0 ? `Family History: ${history.join(". ")}` : "No significant family history reported.";
};

const generateSocialHistory = () => {
  return socialHabits.map(habit => {
    const [category, options] = Object.entries(habit)[0];
    return `${category.charAt(0).toUpperCase() + category.slice(1)}: ${faker.helpers.arrayElement(options)}`;
  }).join(". ");
};

export const generateRandomPatient = () => {
  const randomChiefComplaint = faker.helpers.arrayElement(chiefComplaints);
  const randomSymptoms = faker.helpers.arrayElements(symptoms, { min: 3, max: 6 });
  const pastConditions = faker.helpers.arrayElements(medicalConditions, { min: 0, max: 4 });
  const currentMedications = faker.helpers.arrayElements(medications, { min: 1, max: 5 });
  const patientAllergies = faker.helpers.arrayElements(allergies, { min: 0, max: 3 });

  const detailedMedicalHistory = generateDetailedMedicalHistory(pastConditions);
  const familyHistory = generateFamilyHistory();
  const socialHistory = generateSocialHistory();

  return {
    name: faker.person.fullName(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 85, mode: 'age' }).toISOString().split('T')[0],
    chiefComplaint: randomChiefComplaint,
    symptoms: `Patient presents with ${randomChiefComplaint.toLowerCase()}. Additional symptoms include ${randomSymptoms.join(", ")}.`,
    medicalHistory: `${detailedMedicalHistory}\n\nCurrent Medications: ${currentMedications.join(", ")}\n\nAllergies: ${patientAllergies.length > 0 ? patientAllergies.join(", ") : "No known allergies"}\n\n${familyHistory}\n\nSocial History: ${socialHistory}`,
  };
};