import { useState } from "react";

function Message({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copyMessage = async () => {
    await navigator.clipboard?.writeText(message.content || "");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const renderContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "");
        return (
          <div className="code-block" key={index}>
            <div className="code-header">
              <span>Code</span>
              <button onClick={() => navigator.clipboard?.writeText(lines)}>Copy code</button>
            </div>
            <pre><code>{lines}</code></pre>
          </div>
        );
      }

      return (
        <span key={index}>
          {part.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>{line}{lineIndex < part.split("\n").length - 1 && <br />}</span>
          ))}
        </span>
      );
    });
  };

  return (
    <article className={`message-row ${isUser ? "user-message" : "assistant-message"}`}>
      <div className="message-avatar">{isUser ? "You" : "N"}</div>
      <div className="message-body">
        <div className="message-meta">
          <strong>{isUser ? "You" : "NexaAI"}</strong>
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div className="message-content">
          {message.isImage ? <img src={message.content} alt="AI generated result" className="generated-image" /> : renderContent(message.content)}
        </div>
        {!isUser && (
          <div className="message-actions">
            <button onClick={copyMessage}>{copied ? "Copied ✓" : "Copy"}</button>
            <button onClick={onRegenerate}>Regenerate</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default Message;
