# 🚀 NexaAI – AI-Powered Personal Assistant

<p align="center">
  <b>Your Personal AI Assistant for Smarter Conversations</b>
</p>

NexaAI is a full-stack, AI-powered conversational application featuring a responsive **React 19** frontend and a robust **FastAPI** backend with **Google Gemini AI** integration, **JWT authentication**, and persistent conversation history. It provides an intelligent, interactive conversational experience similar to ChatGPT with thread management, search, and dark/light themes.

---

## ✨ Key Features

- 🤖 **Google Gemini AI Integration:** Intelligent, contextual chat responses powered by Google GenAI.
- 🔐 **Secure Authentication:** User registration, login, and password reset with `argon2id` password hashing and stateless JWT bearer tokens.
- 💬 **Conversation Management:** Automatically saves chat history, auto-names threads, and supports searching, renaming, and deleting conversations.
- 📚 **Chat History & Search:** Quickly access and find previous conversations.
- 🎨 **Dark & Light Mode:** Built-in instant theme switcher with local storage persistence.
- 📱 **Responsive Design:** Mobile-friendly sidebar drawer and clean, modern layout.
- ⚡ **High-Performance Backend:** Asynchronous API powered by FastAPI, SQLite, and SQLAlchemy 2.0.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router, Tailwind CSS & Modern Custom CSS |
| **Backend** | Python 3.10+ (tested on Python 3.13), FastAPI, Uvicorn, Pydantic v2 |
| **Database & ORM** | SQLite, SQLAlchemy 2.0 |
| **Authentication & Security** | PyJWT (Bearer token), `pwdlib` (`argon2id` password hashing) |
| **AI Integration** | Google Gemini API (`google-genai` SDK) |
| **Development Tools** | Git, GitHub, VS Code |

---

## 📂 Project Structure

```text
NexaAI/
├── backend/
│   └── NexaAI/
│       ├── client/                      # React 19 + Vite Frontend
│       │   ├── public/                  # Static assets & icons
│       │   ├── src/
│       │   │   ├── assets/              # Icons, logos, and global CSS
│       │   │   ├── components/          # Sidebar, ChatComponent, ChatInput, Message
│       │   │   ├── context/             # AppContext (Auth, Chat & Theme state)
│       │   │   ├── pages/               # Login, Community, Credits, Loading
│       │   │   ├── services/            # Centralized API service (api.js)
│       │   │   ├── App.jsx              # App shell & layout coordinator
│       │   │   └── main.jsx             # React entry point
│       │   ├── .env.example             # Example frontend env
│       │   ├── package.json             # Frontend dependencies & scripts
│       │   └── vite.config.js           # Vite configuration
│       │
│       └── server/                      # FastAPI Backend
│           ├── app/
│           │   ├── database/            # SQLAlchemy database connection
│           │   ├── models/              # User, Conversation, Message DB models
│           │   ├── routes/              # Auth, Chat, Conversations, User routes
│           │   ├── schemas/             # Pydantic request/response schemas
│           │   ├── services/            # Gemini AI Service & Auth Service
│           │   ├── config.py            # Settings loaded from environment
│           │   └── main.py              # FastAPI app & CORS configuration
│           ├── venv/                    # Virtual environment
│           ├── .env.example             # Example backend env
│           ├── nexaai.db                # SQLite database (auto-created)
│           └── requirements.txt         # Backend Python dependencies
├── opencode.json                        # OpenCode configuration
├── .gitignore                           # Git ignore rules
└── README.md                            # Project documentation
```

---

## 🏗️ Application Architecture

```text
       USER
         |
         v
   REACT FRONTEND (Vite / React 19)
         |
         v (REST API / Bearer JWT)
    FASTAPI BACKEND
         |
    +----+---------------+
    |                    |
    v                    v
 GOOGLE GEMINI      SQLITE / SQLALCHEMY
 (google-genai)     (Users, Threads, Messages)
    |                    |
    v                    |
 AI RESPONSE             |
    |                    |
    +---------+----------+
              |
              v
       REACT FRONTEND
              |
              v
       DISPLAY RESPONSE
```

### Application Workflow

1. **Authentication:** The user registers or logs in via `/api/auth/login`, obtaining a JWT stored in browser storage.
2. **Conversation Initialization:** The user creates or selects an existing conversation thread.
3. **Chat Interaction:** The frontend sends user prompts with conversation context to `/api/chat`.
4. **AI Processing:** The backend invokes the Google Gemini model via `google-genai` and receives the generated response.
5. **Persistence:** The query and AI response are persisted in SQLite under the conversation ID.
6. **Rendering:** The frontend renders messages with real-time UI updates.

---

## ⚙️ Installation and Setup

Follow these steps to run NexaAI on your local machine.

### Prerequisites

Make sure you have installed:

- **Python 3.10+** (Python 3.13 tested)
- **Node.js 18+** & npm
- **Git**
- A **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/sangeeta344/NexaAI.git
cd NexaAI
```

---

### 2. Backend Setup (FastAPI)

1. Open a terminal and navigate to the server directory:
   ```powershell
   cd backend/NexaAI/server
   ```

2. Create and activate a Python virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. Install backend dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Copy `.env.example` to `.env` (or create `.env`):
   ```env
   APP_NAME="NexaAI API"
   DATABASE_URL="sqlite:///./nexaai.db"
   JWT_SECRET_KEY="your-super-secret-jwt-key"
   JWT_ALGORITHM="HS256"
   ACCESS_TOKEN_EXPIRE_MINUTES="1440"
   FRONTEND_URL="http://localhost:5173"

   # Gemini API
   GEMINI_API_KEY="your-gemini-api-key-here"
   GEMINI_MODEL="gemini-3.5-flash-lite"
   ```

5. Start the FastAPI server:
   ```powershell
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

- **Backend API URL:** [http://localhost:8000](http://localhost:8000)
- **Health Check:** [http://localhost:8000/health](http://localhost:8000/health)
- **Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Frontend Setup (React / Vite)

1. Open a second terminal and navigate to the client directory:
   ```powershell
   cd backend/NexaAI/client
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Configure environment variables (optional, defaults to `http://localhost:8000`):
   Create a `.env` file if custom host/port is needed:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```powershell
   npm run dev
   ```

- **Frontend Web App:** [http://localhost:5173](http://localhost:5173)

---

## 📡 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check status |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT |
| `POST` | `/api/auth/reset-password` | Reset password for an account |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/chat` | Send a prompt and receive Gemini response |
| `GET` | `/api/conversations` | List user's conversations |
| `POST` | `/api/conversations` | Create a new conversation |
| `GET` | `/api/conversations/{id}` | Retrieve chat history for conversation |
| `PATCH` | `/api/conversations/{id}` | Rename conversation |
| `DELETE`| `/api/conversations/{id}` | Delete conversation |

---

## 🔮 Future Enhancements

- 🎙️ Voice-based AI conversations.
- 📎 File upload and document analysis (PDF/images).
- 🔄 Support for additional AI models & providers.
- 🌊 Server-Sent Events (SSE) streaming for real-time word-by-word token delivery.
- 🌐 Multilingual conversation support.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <b>Built with ❤️ using React, Python, FastAPI and Google Gemini AI</b>
</p>
