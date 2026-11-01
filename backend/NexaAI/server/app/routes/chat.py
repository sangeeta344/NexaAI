from datetime import datetime, timezone
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.user import User
from app.routes.auth import get_current_user
from app.schemas.chat import ChatRequest, ChatResponse, MessageResponse
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/chat", tags=["Chat"])


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conversation = None
    if payload.conversation_id:
        conversation = db.query(Conversation).filter(Conversation.id == payload.conversation_id, Conversation.user_id == user.id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        now = datetime.now(timezone.utc)
        conversation = Conversation(id=str(uuid4()), user_id=user.id, title=payload.message[:60], created_at=now, updated_at=now)
        db.add(conversation)
        db.flush()

    user_message = Message(conversation_id=conversation.id, role="user", content=payload.message.strip())
    db.add(user_message)
    db.flush()

    history = [{"role": message.role, "content": message.content} for message in conversation.messages]
    assistant_content = await ai_service.generate_response(history)
    assistant_message = Message(conversation_id=conversation.id, role="assistant", content=assistant_content)
    db.add(assistant_message)
    conversation.updated_at = datetime.now(timezone.utc)
    if conversation.title == "New chat":
        conversation.title = payload.message.strip()[:60]
    db.commit()
    db.refresh(assistant_message)

    return ChatResponse(conversation_id=conversation.id, message=MessageResponse.model_validate(assistant_message))
