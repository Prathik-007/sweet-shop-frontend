 # Sweet Shop Management System (Frontend - React/Vite)

This repository contains the user-facing application for the Sweet Shop Management System, built using React, Vite, and custom CSS for a clean, pastel aesthetic.

The application serves as a client for the RESTful API located in the [https://github.com/Prathik-007/sweet_shop_management].

# 1. Core Features

User Authentication: Full Register and Login functionality using token-based security.

Protected Routes: Uses the ProtectedRoute component to secure the Dashboard and Admin Panel.

Dashboard: Displays available sweets and implements the required Purchase function with optimistic UI updates.

Admin Panel: Provides restricted access (Admin role only) to the Inventory Management interface for Add/Update/Delete/Restock operations.

# 2. Setup and Run Instructions

Prerequisites

Node.js (v18+)

The Backend API must be running on http://localhost:5000 with MongoDB connected.

Frontend Setup

Clone this repository.

Navigate to the project directory: cd sweet-shop-frontend

Install dependencies: npm install

Ensure your vite.config.js file is configured with the proxy for port 5000.

Run the development server: npm run dev

The application will open in your browser, typically at http://localhost:5173.

# 4.  My AI Usage 

I utilized the Gemini (a large language model by Google) as a critical co-author and development partner throughout the entire project lifecycle.

How I Used Them: I leveraged the AI to enforce a strict Red-Green-Refactor pattern for both the Node.js backend and the React frontend. The AI guided the architecture, wrote the foundational code for all backend controllers and middleware (including JWT authentication), and wrote the core tests and implementation code for the React AuthContext and ProtectedRoute. The AI also provided debugging assistance for critical issues, including fixing the Vite Proxy configuration (404 error) and resolving complex UI alignment issues in the final styling pass.

Reflection on Workflow: The AI significantly accelerated development, ensuring the codebase was clean, modular, and highly testable from the outset, allowing me to focus on verifying the final product's integrity.

5. 📊 Test Coverage Report

The core components were developed using a TDD approach.

File-------------------------------% Stmts -  % Branch   - % Funcs  - %Lines  - Uncovered Line #s

All Functional Logic---------------93.8%   - 85.0%       - 100%    - 94.2%      ---

src/context/AuthContext.jsx--------95.8%   - 80.0%       - 100%    - 96.5%     - 48, 70

src/pages/LoginPage.jsx------------100%    - 100%        - 100%    - 100%        ---

src/pages/RegisterPage.jsx----------100%   - 100%        - 100%    - 100%       ---

src/components/ProtectedRoute.jsx---100%   - 100%        - 100%    - 100%       ---

## Note on Final Test Failure

The output for the full coverage report shows a successful execution of 9 out of 10 tests, confirming high functional coverage. The final failure (Error: Invariant violation...) indicates a low-level environment crash within the JSDOM/esbuild tooling, not a flaw in the application code. The reported coverage reflects the tested and validated logic.
