import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatComponent from "./components/ChatComponent";
import ChatInput from "./components/ChatInput";
import WelcomeMessage from "./components/WelcomeMessage";
import Login from "./pages/Login";
import Community from "./pages/Community";
import Credits from "./pages/Credits";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import { api } from "./services/api";

function App() {
  const { user, selectedChat, chats, createNewChat, selectChat, theme, setTheme, logout, authLoading } = useAppContext();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [page, setPage] = useState("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequest, setLastRequest] = useState("");

  useEffect(() => {
    if (!selectedChat && chats.length) selectChat(chats[0]._id).catch(() => {});
  }, [selectedChat, chats, selectChat]);

  const activeMessages = selectedChat?.messages || [];
  const currentTitle = useMemo(() => selectedChat?.name || "New chat", [selectedChat]);

  const handleNewChat = async () => {
    try { await createNewChat(); setPage("chat"); setInputMessage(""); setMobileSidebarOpen(false); } catch (error) { window.alert(error.message); }
  };

  const sendMessage = async (message = inputMessage) => {
    const text = message.trim();
    if (!text || isLoading) return;
    setInputMessage("");
    setLastRequest(text);
    setIsLoading(true);
    try {
      const response = await api.chat({ conversation_id: selectedChat?._id || null, message: text });
      const userMessage = { id: `local-${Date.now()}`, role: "user", content: text, timestamp: new Date().toISOString() };
      const assistantMessage = { id: response.message.id, role: response.message.role, content: response.message.content, timestamp: response.message.created_at };
      const existing = selectedChat?.messages || [];
      const updated = [...existing, userMessage, assistantMessage];
      // Backend creates a conversation automatically when conversation_id is null.
      const event = new CustomEvent("nexa-chat-updated", { detail: { id: response.conversation_id, messages: updated } });
      window.dispatchEvent(event);
      if (!selectedChat) {
        window.dispatchEvent(new CustomEvent("nexa-chat-created"));
      }
    } catch (error) {
      window.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const regenerate = async () => {
    if (!lastRequest || isLoading || !selectedChat) return;
    await sendMessage(lastRequest);
  };

  useEffect(() => {
    const handler = (event) => {
      const { id, messages } = event.detail;
      if (id !== selectedChat?._id) return;
      selectChat(id).catch(() => {});
      void messages;
    };
    const createdHandler = async () => {
      try {
        const data = await api.listConversations();
        const latest = data[0];
        if (latest) await selectChat(latest.id);
      } catch {
        // The chat response itself remains available; refresh can be retried later.
      }
    };
    window.addEventListener("nexa-chat-updated", handler);
    window.addEventListener("nexa-chat-created", createdHandler);
    return () => {
      window.removeEventListener("nexa-chat-updated", handler);
      window.removeEventListener("nexa-chat-created", createdHandler);
    };
  }, [selectedChat, selectChat]);

  if (authLoading) return <Loading />;
  if (!user) return <Login />;

  return (
    <div className={`app-shell ${theme}`}>
      <Sidebar user={user} chats={chats} selectedChat={selectedChat} onNewChat={handleNewChat}
        onSelectChat={(id) => { selectChat(id).catch((e) => window.alert(e.message)); setPage("chat"); setMobileSidebarOpen(false); }}
        onNavigate={setPage} onLogout={logout} theme={theme} setTheme={setTheme}
        mobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)} />
      <main className="main-shell">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setMobileSidebarOpen(true)} aria-label="Open sidebar">☰</button>
          <strong>NexaAI</strong>
          <button className="icon-button" onClick={handleNewChat} aria-label="New chat">＋</button>
        </header>
        {page === "community" ? <Community onBack={() => setPage("chat")} /> : page === "credits" ? <Credits onBack={() => setPage("chat")} /> : page === "loading" ? <Loading /> : (
          <section className="chat-page">
            <div className="chat-topbar"><div><span className="eyebrow">NexaAI</span><h1>{currentTitle}</h1></div><span className="model-badge">NexaAI · Backend</span></div>
            <div className="chat-scroll">{activeMessages.length === 0 ? <WelcomeMessage onPrompt={(prompt) => sendMessage(prompt)} /> : <ChatComponent messages={activeMessages} isLoading={isLoading} onRegenerate={regenerate} />}</div>
            <ChatInput inputMessage={inputMessage} onChange={setInputMessage} handleSendMessage={() => sendMessage()} isLoading={isLoading} />
            <p className="disclaimer">NexaAI responses are generated by the configured backend AI service.</p>
          </section>
        )}
      </main>
    </div>
  );
}
export default App;
