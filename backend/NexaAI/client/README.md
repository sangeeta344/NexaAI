# NexaAI Frontend

Professional React/Vite frontend for NexaAI. The current version is frontend-only and uses mock AI responses.

## Run

```bash
cd client
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Current frontend features

- ChatGPT-style responsive chat layout
- Sidebar with New Chat, chat history and search
- Suggested prompts
- Mock AI responses
- Loading indicator
- Copy response and code
- Regenerate response
- Light/dark mode
- Mobile sidebar
- Login demo page
- Community page
- Credits page
- Backend/API kept out of the UI layer

## Backend integration

The next step is to create an API service layer and backend endpoints for authentication, chat persistence, AI generation, credits and community data. Do not put provider API keys in the React client; keep secrets on the backend.
