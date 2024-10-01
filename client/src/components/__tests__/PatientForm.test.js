import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PatientForm from '../PatientForm';

describe('PatientForm', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<PatientForm />);
    expect(getByPlaceholderText('Patient Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Medical History')).toBeInTheDocument();
    expect(getByText('Save Patient')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(<PatientForm />);
    const nameInput = getByPlaceholderText('Patient Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });
});