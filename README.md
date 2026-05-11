# AI Email Generator

A simple full stack application for generating professional emails using an AI backend and a React + Tailwind frontend.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, dotenv, CORS
- AI: Google Gemini via `@google/genai`

## Project Structure

- `Frontend/`
  - `src/pages/Feed.jsx` — main UI for prompt input, tone selection, and output display
  - `src/components/` — reusable input, button, tone selector, and display components
  - `src/api/axios.js` — Axios instance configured with `VITE_BACKEND_URL`

- `Backend/`
  - `server.js` — server entry point
  - `src/app.js` — Express app setup and route registration
  - `src/routes/ai.route.js` — POST `/api/ai/email-generator`
  - `src/controllers/ai.controller.js` — request validation and controller logic
  - `src/services/ai.service.js` — Gemini API call and prompt formatting

## Development Mode Setup

### Backend

1. `cd Backend`
2. `npm install`
3. Create a `.env` file with:
   - `GOOGLE_GEMINI_KEY=your_api_key`
   - `Frontend_URL=http://localhost:5173`
4. `npm start`

### Frontend

1. `cd Frontend`
2. `npm install`
3. Create a `.env` file with:
   - `VITE_BACKEND_URL=http://localhost:3000/api`
4. `npm run dev`

## Production Mode Setup
Frontend_URL and VITE_BACKEND_URL have not been included here for security reasons.

## Usage

- Enter an email prompt or topic
- Choose a tone: Professional, Friendly, Formal, or Casual
- Click Generate
- View the generated email output

## Notes

- The backend sends the prompt and tone to the Gemini model
- The frontend handles loading state and error messages
- The app is designed for clean structure and easy local setup


