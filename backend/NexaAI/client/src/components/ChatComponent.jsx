import Message from "./Message";
import ChatLoadingIndicator from "./ChatLoadingIndicator";

function ChatComponent({ messages, isLoading, onRegenerate }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onRegenerate={message.role === "assistant" ? onRegenerate : undefined}
        />
      ))}
      {isLoading && <ChatLoadingIndicator />}
    </div>
  );
}

export default ChatComponent;
