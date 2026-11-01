from fastapi import APIRouter, Depends
from app.models.user import User
from app.routes.auth import get_current_user
from app.schemas.user import UserResponse

router = APIRouter(prefix="/api/user", tags=["User"])


@router.get("/me", response_model=UserResponse)
def user_me(user: User = Depends(get_current_user)):
    return user
