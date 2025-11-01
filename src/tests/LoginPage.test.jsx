import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../context/AuthContext'; // Import the real hook

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(), // Mock the useAuth hook
}));

const mockLogin = vi.fn(); // Create a spy function

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('LoginPage Component', () => {
  // Set up the mock before each test
  beforeEach(() => {
    vi.clearAllMocks(); // Clear spy history
    // Make useAuth return our spy function
    useAuth.mockReturnValue({
      login: mockLogin, 
    });
  });

  it('should render the login form', () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should update form state on user input', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  // --- UPDATED TEST ---
  it('should call login from context on form submit', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    // 1. Fill out the form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // 2. Click the login button
    await user.click(screen.getByRole('button', { name: /login/i }));

    // 3. Check if our mock login function was called correctly
    expect(mockLogin).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });
});