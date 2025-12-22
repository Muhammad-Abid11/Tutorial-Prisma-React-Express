# Todo App Client (React + Vite)

This is the frontend for the Todo Application, built with React, Vite, and Tailwind CSS.

## Features

- **Modern UI**: Styled with Tailwind CSS for a dark, sleek look.
- **API Integration**: Connects to the Express backend to manage todos.
- **Real-time Updates**: State management ensures the UI reflects the latest data.

## Setup

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the `Client` directory:

    ```env
    VITE_BACKEND_URL=http://localhost:3001
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Structure

- `src/api`: Axios setup and service functions.
- `src/components`: Reusable UI components (`TodoInput`, `TodoItem`).
- `src/App.jsx`: Main application logic.
