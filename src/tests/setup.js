import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// This runs after each test, automatically cleaning up
// the components to prevent errors.
afterEach(() => {
  cleanup();
});