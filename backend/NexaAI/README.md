# NexaAI

NexaAI is a React + FastAPI AI chatbot project.

## Structure

```text
NexaAI/
├── client/       # React + Vite frontend
└── server/       # FastAPI + SQLAlchemy backend
```

## Run backend (Windows PowerShell)

```powershell
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Backend: http://localhost:8000
Swagger: http://localhost:8000/docs

## Run frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173

The frontend uses `VITE_API_URL=http://localhost:8000` by default. Copy `client/.env.example` to `client/.env` if you want to change it.

The backend defaults to clearly labeled mock AI responses. Configure the server `.env` to connect an OpenAI-compatible model later. Never put the AI key in the React app.
