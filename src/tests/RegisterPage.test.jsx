import { describe, it, expect, vi } from 'vitest'; // <-- Import vi
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import axios from 'axios'; // <-- Import axios

// Mock the entire axios library
vi.mock('axios');

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('RegisterPage Component', () => {
  it('should render the registration form', () => {
    // ... (existing test)
  });

  it('should update form state on user input', async () => {
    // ... (existing test)
  });

  // --- NEW TEST ---
  it('should call the register API on form submit', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />);

    // Mock a successful API response
    axios.post.mockResolvedValue({
      data: { token: 'fake_jwt_token' },
    });

    // 1. Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // 2. Click the register button
    await user.click(screen.getByRole('button', { name: /register/i }));

    // 3. Check if axios.post was called correctly
    expect(axios.post).toHaveBeenCalledWith(
      // We expect it to call the backend register endpoint
      '/api/auth/register',
      // We expect it to send all the form data
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }
    );
  });
});