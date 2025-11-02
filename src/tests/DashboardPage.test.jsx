import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage'; // This file doesn't exist yet!
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Our fake sweets data
const mockSweets = [
  { _id: '1', name: 'Kaju Katli', price: 100, quantity: 50 },
  { _id: '2', name: 'Jalebi', price: 50, quantity: 200 },
];

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('DashboardPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock a logged-in user
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { role: 'User' },
    });

    // Mock the API call
    axios.get.mockResolvedValue({ data: mockSweets });
  });

  it('should fetch and display sweets on render', async () => {
    renderWithRouter(<DashboardPage />);

    // Check if the API was called
    expect(axios.get).toHaveBeenCalledWith('/api/sweets');

    // Wait for the component to update after the API call
    // We look for the *name* of the last sweet in our mock list
    await waitFor(() => {
      expect(screen.getByText('Jalebi')).toBeInTheDocument();
    });

    // Check if both sweets are rendered
    expect(screen.getByText('Kaju Katli')).toBeInTheDocument();
  });
});