import { describe, it, expect } from 'vitest'; // <-- ADD THIS LINE
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'; // This file doesn't exist yet!

// We wrap our component in MemoryRouter to handle any <Link> components
// we might add later (like a "Need to register?" link)
const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('LoginPage Component', () => {
  it('should render the login form', () => {
    renderWithRouter(<LoginPage />);
    
    // Check for the email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    // Check for the password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Check for the login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});