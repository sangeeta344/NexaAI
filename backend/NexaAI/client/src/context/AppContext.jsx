import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, clearToken, getToken, setToken } from "../services/api";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("nexa-theme") || "light");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("nexa-theme", theme);
  }, [theme]);

  const selectedChat = useMemo(
    () => chats.find((chat) => chat._id === selectedChatId) || null,
    [chats, selectedChatId]
  );

  const refreshChats = useCallback(async () => {
    const data = await api.listConversations();
    const summaries = data.map((chat) => ({
      _id: chat.id,
      name: chat.title,
      userId: user?.id,
      messages: [],
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    }));
    setChats(summaries);
    if (summaries.length && !selectedChatId) setSelectedChatId(summaries[0]._id);
  }, [selectedChatId, user]);

  useEffect(() => {
    const restoreSession = async () => {
      if (!getToken()) {
        setAuthLoading(false);
        return;
      }
      try {
        const currentUser = await api.me();
        setUser(currentUser);
      } catch {
        clearToken();
      } finally {
        setAuthLoading(false);
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    if (user) refreshChats().catch(() => setChats([]));
    else {
      setChats([]);
      setSelectedChatId(null);
    }
  }, [user, refreshChats]);

  const applyAuth = (data) => {
    setToken(data.access_token);
    setUser(data.user);
  };

  const login = async (email, password) => applyAuth(await api.login({ email, password }));
  const register = async (name, email, password) => applyAuth(await api.register({ name, email, password }));
  const resetPassword = async (email, new_password) => applyAuth(await api.resetPassword({ email, new_password }));

  const logout = async () => {
    try {
      if (getToken()) await api.logout();
    } catch {
      // Local logout still happens if the server is unavailable.
    } finally {
      clearToken();
      setUser(null);
      setChats([]);
      setSelectedChatId(null);
    }
  };

  const createNewChat = useCallback(async () => {
    const chat = await api.createConversation();
    const normalized = {
      _id: chat.id,
      name: chat.title,
      userId: user?.id,
      messages: [],
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    };
    setChats((current) => [normalized, ...current]);
    setSelectedChatId(normalized._id);
    return normalized;
  }, [user]);

  const selectChat = useCallback(async (id) => {
    setSelectedChatId(id);
    const detail = await api.getConversation(id);
    setChats((current) => {
      const normalized = { _id: detail.id, name: detail.title, userId: user?.id, messages: detail.messages.map((m) => ({ id: m.id, role: m.role, content: m.content, timestamp: m.created_at })), createdAt: detail.created_at, updatedAt: detail.updated_at };
      const exists = current.some((chat) => chat._id === id);
      return exists ? current.map((chat) => chat._id === id ? normalized : chat) : [normalized, ...current];
    });
  }, []);

  const updateChatMessages = useCallback((id, messages) => {
    setChats((current) => current.map((chat) => chat._id === id ? { ...chat, messages } : chat));
  }, []);

  const value = {
    user, setUser, chats, setChats, selectedChat, selectedChatId,
    createNewChat, selectChat, updateChatMessages, refreshChats,
    login, register, resetPassword, logout, authLoading, theme, setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppContextProvider");
  return context;
};
