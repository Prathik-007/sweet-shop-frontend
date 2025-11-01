import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage'; // This file doesn't exist yet!

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('RegisterPage Component', () => {
  it('should render the registration form', () => {
    renderWithRouter(<RegisterPage />);

    // Check for the name input
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

    // Check for the email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Check for the password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check for the register button
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});