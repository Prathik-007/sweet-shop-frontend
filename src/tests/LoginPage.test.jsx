import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- IMPORT USER-EVENT
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('LoginPage Component', () => {
  it('should render the login form', () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // --- NEW TEST ---
  it('should update form state on user input', async () => {
    const user = userEvent.setup(); // Setup the user-event simulation
    renderWithRouter(<LoginPage />);

    // Get the inputs
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate typing
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    // Check if the inputs' values have changed
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});