import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- IMPORT USER-EVENT
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('RegisterPage Component', () => {
  it('should render the registration form', () => {
    renderWithRouter(<RegisterPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  // --- NEW TEST ---
  it('should update form state on user input', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />);

    // Get the inputs
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate typing
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    // Check if the inputs' values have changed
    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});