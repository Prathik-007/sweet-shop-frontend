import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { useAuth } from '../context/AuthContext'; // Import the real hook

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(), // Mock the useAuth hook
}));

const mockRegister = vi.fn(); // Create a spy function

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('RegisterPage Component', () => {
  // Set up the mock before each test
  beforeEach(() => {
    vi.clearAllMocks(); // Clear spy history
    // Make useAuth return our spy function
    useAuth.mockReturnValue({
      register: mockRegister, 
    });
  });

  it('should render the registration form', () => {
    renderWithRouter(<RegisterPage />);
    // ... (existing test)
  });

  it('should update form state on user input', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />);
    // ... (existing test)
  });

  // --- UPDATED TEST ---
  it('should call register from context on form submit', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />);

    // 1. Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // 2. Click the register button
    await user.click(screen.getByRole('button', { name: /register/i }));

    // 3. Check if our mock register function was called correctly
    expect(mockRegister).toHaveBeenCalledWith(
      'Test User',
      'test@example.com',
      'password123'
    );
  });
});