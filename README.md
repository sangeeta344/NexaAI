# 🚀 NexaAI – AI-Powered Personal Assistant

<p align="center">
  <b>Your Personal AI Assistant for Smarter Conversations</b>
</p>

NexaAI is an AI-powered personal assistant designed to provide an intelligent and interactive conversational experience. It offers a ChatGPT-like interface where users can ask questions, receive AI-generated responses, manage conversations, and access their chat history.

Built using React.js and FastAPI, NexaAI combines a modern frontend with a secure Python backend and AI model integration.

---

## ✨ Key Features

- 🤖 **AI-Powered Chat:** Interact with AI and receive intelligent responses.
- 🔐 **User Authentication:** Secure user registration and login.
- 💬 **Conversation Management:** Create new conversations and manage existing chats.
- 📚 **Chat History:** Access previously saved conversations.
- 🔍 **Chat Search:** Find previous conversations easily.
- 🎨 **Dark & Light Mode:** Switch between different interface themes.
- 📱 **Responsive Design:** User-friendly interface across different screen sizes.
- 🧠 **AI Model Integration:** Connect with Google Gemini and supported AI providers.
- ⚡ **Fast Backend:** High-performance API development using FastAPI.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend | Python, FastAPI |
| Database | SQLite |
| Authentication | Argon2 |
| AI Integration | Google Gemini, Google GenAI SDK |
| Development Tools | VS Code, Git, GitHub |

## 📂 Project Structure

```text
NexaAI/
│
├── backend/
│   └── NexaAI/
│       │
│       ├── client/                  # Frontend
│       │   ├── public/
│       │   ├── src/
│       │   ├── package.json
│       │   ├── package-lock.json
│       │   ├── vite.config.js
│       │   └── README.md
│       │
│       └── server/                  # Backend
│           ├── app/
│           ├── requirements.txt
│           ├── .env.example
│           └── README.md
│
├── opencode.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run NexaAI on your local machine.

### Prerequisites

Make sure you have installed:

- Python 3.10 or above
- Node.js and npm
- Git
- VS Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/sangeeta344/NexaAI.git
```

Navigate to the project directory:

```bash
cd NexaAI
```

### 2. Frontend Setup

Navigate to the frontend directory:

```powershell
cd backend\NexaAI\client
```

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open your browser:

http://localhost:5173

### 3. Backend Setup

Open a new terminal and navigate to the backend directory:

```powershell
cd D:\Desktop\NexaAI\backend\NexaAI\server
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server using the project's configured application entry point. For example, if the FastAPI instance is defined as `app` in `app/main.py`:

```bash
uvicorn app.main:app --reload
```

Backend URL:

http://localhost:8000

API documentation:

http://localhost:8000/docs

## 🔑 Environment Variables

NexaAI uses environment variables to configure AI integration and application settings.

Create your backend `.env` file using the provided `.env.example` template.

Example configuration:

```env
AI_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=your_api_base_url
AI_MOCK_MODE=false
FRONTEND_URL=http://localhost:5173
```

For the frontend, configure the API URL in its environment configuration if required:

```env
VITE_API_URL=http://localhost:8000
```

**Security Note:**
- Never upload your actual `.env` files to GitHub.
- Never expose API keys or secret credentials in frontend code.
- Use `.env.example` to share configuration templates safely.

## 🏗️ Application Architecture

NexaAI follows a frontend-backend architecture.

```text
       USER
         |
         v
   REACT FRONTEND
         |
         v
    FASTAPI BACKEND
         |
    +----+---------+
    |              |
    v              v
 AI PROVIDER     SQLITE
    |              |
    v              |
 AI RESPONSE       |
    |              |
    +------+-------+
           |
           v
    REACT FRONTEND
           |
           v
    DISPLAY RESPONSE
```

### Application Workflow

1. The user opens NexaAI and logs into their account.
2. The user starts a new conversation or opens an existing chat.
3. The frontend sends the user's message to the FastAPI backend.
4. The backend processes the request and communicates with the configured AI provider.
5. The AI provider generates a response.
6. The backend returns the response to the frontend.
7. The conversation is stored in the database for future access.

## 🔌 API Documentation

NexaAI uses REST APIs developed with FastAPI for communication between the frontend and backend.

The backend provides functionality for:

- User authentication
- Chat management
- Conversation management
- User-related operations
- AI response generation

Explore the available API endpoints through FastAPI Swagger documentation:

http://localhost:8000/docs

## 🔮 Future Enhancements

- Voice-based AI conversations.
- File upload and document analysis.
- Support for additional AI models.
- Improved real-time response streaming.
- Advanced personalization features.
- Multilingual conversation support.



---

<p align="center">
  <b>Built with ❤️ using React, Python, FastAPI and AI</b>
</p>
