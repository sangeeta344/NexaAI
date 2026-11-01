import React from 'react';

function ChatInput({ inputMessage, onChange, handleSendMessage }) {
  return (
    <div className="ChatInput">
      <input
        type="text"
        value={inputMessage}
        onChange={onChange}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput;
