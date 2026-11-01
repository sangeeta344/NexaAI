import asyncio

from fastapi import HTTPException
from google import genai

from app.config import get_settings


class AIService:
    """Gemini-powered AI service for NexaAI."""

    async def generate_response(self, messages: list[dict[str, str]]) -> str:
        settings = get_settings()

        if not settings.GEMINI_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="Gemini API key is not configured"
            )

        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)

            # Convert chat history into a simple prompt.
            conversation = []

            for message in messages:
                role = message.get("role", "user")
                content = message.get("content", "").strip()

                if not content:
                    continue

                if role == "user":
                    conversation.append(f"User: {content}")
                elif role == "assistant":
                    conversation.append(f"Assistant: {content}")

            prompt = "\n\n".join(conversation)

            # Run the synchronous Gemini SDK call without blocking FastAPI.
            response = await asyncio.to_thread(
                client.models.generate_content,
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )

            if not response.text:
                raise ValueError("Gemini returned an empty response")

            return response.text

        except Exception as exc:
            print(f"Gemini error: {exc}")
            raise HTTPException(
                status_code=502,
                detail="Gemini request failed"
            ) from exc


ai_service = AIService()