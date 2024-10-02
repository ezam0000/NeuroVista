import { faker } from '@faker-js/faker';

export const generateRandomPatient = () => {
  return {
    name: faker.person.fullName(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    chiefComplaint: faker.lorem.sentence(),
    symptoms: faker.lorem.paragraph(),
    medicalHistory: faker.lorem.paragraph()
  };
};