function ChatLoadingIndicator() {
  return (
    <div className="loading-row">
      <div className="message-avatar">N</div>
      <div className="loading-bubble">
        <span></span><span></span><span></span>
        <em>NexaAI is thinking…</em>
      </div>
    </div>
  );
}

export default ChatLoadingIndicator;
