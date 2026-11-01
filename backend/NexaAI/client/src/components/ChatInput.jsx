import { useEffect, useRef } from "react";

function ChatInput({ inputMessage, onChange, handleSendMessage, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const node = textareaRef.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 160)}px`;
  }, [inputMessage]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="composer-wrap">
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          rows="1"
          value={inputMessage}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message NexaAI..."
          aria-label="Message NexaAI"
        />
        <div className="composer-actions">
          <span className="composer-hint">Enter to send · Shift + Enter for new line</span>
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? "…" : "↑"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
