# NexaAI Backend

FastAPI + SQLAlchemy + SQLite backend for the NexaAI React client.

## Windows

```powershell
cd server
python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

API: http://localhost:8000
Swagger: http://localhost:8000/docs

The default development mode is `AI_MOCK_MODE=true`. Mock responses are explicitly labeled and allow the frontend to be tested without an AI API key.

To use an OpenAI-compatible provider, set `AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL`, and `AI_MOCK_MODE=false` in `.env`. The API key remains server-side.

## Core endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/chat`
- `POST /api/conversations`
- `GET /api/conversations?q=...`
- `GET /api/conversations/{id}`
- `PATCH /api/conversations/{id}`
- `DELETE /api/conversations/{id}`
