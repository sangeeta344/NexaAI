import { useMemo, useState } from "react";
import { assets } from "../assets/assets";

const Sidebar = ({
  chats,
  selectedChat,
  onNewChat,
  onSelectChat,
  onNavigate,
  onLogout,
  theme,
  setTheme,
  mobileOpen,
  onCloseMobile,
}) => {
  const [search, setSearch] = useState("");

  const filteredChats = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return chats;
    return chats.filter((chat) => {
      const title = chat.name?.toLowerCase() || "";
      const latest = chat.messages?.at(-1)?.content?.toLowerCase() || "";
      return title.includes(query) || latest.includes(query);
    });
  }, [chats, search]);

  return (
    <>
      {mobileOpen && <button className="sidebar-backdrop" onClick={onCloseMobile} aria-label="Close sidebar" />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <img src={theme === "dark" ? assets.logo_full_dark : assets.logo_full} alt="NexaAI" />
          <button className="mobile-close" onClick={onCloseMobile}>×</button>
        </div>

        <button className="new-chat-button" onClick={onNewChat}>
          <span>＋</span> New chat
          <kbd>Ctrl K</kbd>
        </button>

        <div className="sidebar-search">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search chats" />
          {search && <button onClick={() => setSearch("")}>×</button>}
        </div>

        <div className="history-label">Recent chats</div>
        <div className="chat-history">
          {filteredChats.length ? (
            filteredChats.map((chat) => (
              <button
                className={`history-item ${selectedChat?._id === chat._id ? "active" : ""}`}
                key={chat._id}
                onClick={() => onSelectChat(chat._id)}
              >
                <span className="history-icon">◌</span>
                <span>{chat.name || "New chat"}</span>
              </button>
            ))
          ) : (
            <p className="empty-history">No chats found.</p>
          )}
        </div>

        <div className="sidebar-bottom">
          <button onClick={() => onNavigate("community")} className="side-link"><span>◎</span> Community</button>
          <button onClick={() => onNavigate("credits")} className="side-link"><span>◇</span> Credits <strong>{200}</strong></button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="side-link"
          >
            <span>{theme === "dark" ? "☀" : "☾"}</span> {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>

          <div className="profile-card">
            <div className="avatar">{(selectedChat?.userName || "N").charAt(0)}</div>
            <div className="profile-copy">
              <strong>{selectedChat?.userName || "Nexa User"}</strong>
              <span>Free workspace</span>
            </div>
            <button onClick={onLogout} title="Log out">↗</button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
