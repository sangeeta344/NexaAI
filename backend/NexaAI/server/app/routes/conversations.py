from datetime import datetime, timezone
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.conversation import Conversation
from app.models.user import User
from app.routes.auth import get_current_user
from app.schemas.chat import ConversationCreate, ConversationDetail, ConversationSummary, ConversationUpdate

router = APIRouter(prefix="/api/conversations", tags=["Conversations"])


def get_owned_conversation(conversation_id: str, user: User, db: Session) -> Conversation:
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user.id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


@router.post("", response_model=ConversationSummary, status_code=status.HTTP_201_CREATED)
def create_conversation(payload: ConversationCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    conversation = Conversation(id=str(uuid4()), user_id=user.id, title=payload.title.strip() or "New chat", created_at=now, updated_at=now)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


@router.get("", response_model=list[ConversationSummary])
def list_conversations(q: str | None = Query(default=None, max_length=100), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Conversation).filter(Conversation.user_id == user.id)
    if q and q.strip():
        pattern = f"%{q.strip()}%"
        query = query.filter(Conversation.title.ilike(pattern))
    return query.order_by(Conversation.updated_at.desc()).all()


@router.get("/{conversation_id}", response_model=ConversationDetail)
def get_conversation(conversation_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_owned_conversation(conversation_id, user, db)


@router.patch("/{conversation_id}", response_model=ConversationSummary)
def rename_conversation(conversation_id: str, payload: ConversationUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conversation = get_owned_conversation(conversation_id, user, db)
    conversation.title = payload.title.strip()
    conversation.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(conversation)
    return conversation


@router.delete("/{conversation_id}")
def delete_conversation(conversation_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conversation = get_owned_conversation(conversation_id, user, db)
    db.delete(conversation)
    db.commit()
    return {"message": "Conversation deleted"}
