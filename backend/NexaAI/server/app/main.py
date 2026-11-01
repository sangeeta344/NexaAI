from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import get_settings
from app.database.database import Base, engine
from app.models import User, Conversation, Message  # noqa: F401
from app.routes import auth, chat, conversations, user

settings = get_settings()
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME, version="1.0.0")

allowed_origins = list(dict.fromkeys([
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(conversations.router)
app.include_router(user.router)


@app.get("/")
def root():
    return {"name": "NexaAI API", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Keep internal exception details out of API responses.
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})
