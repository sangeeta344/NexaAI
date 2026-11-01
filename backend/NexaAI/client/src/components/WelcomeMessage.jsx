const prompts = [
  ["💡", "Explain a concept", "Explain React hooks in simple words"],
  ["💻", "Write code", "Build a simple Express API"],
  ["🗺️", "Create a roadmap", "Give me a roadmap to learn full-stack development"],
  ["✨", "Brainstorm ideas", "Give me innovative AI project ideas"],
];

function WelcomeMessage({ onPrompt }) {
  return (
    <div className="welcome">
      <div className="welcome-orb">N</div>
      <p className="eyebrow">YOUR AI ASSISTANT</p>
      <h2>How can I help you today?</h2>
      <p className="welcome-copy">Ask questions, write code, brainstorm ideas, or learn something new.</p>

      <div className="prompt-grid">
        {prompts.map(([icon, label, prompt]) => (
          <button key={label} className="prompt-card" onClick={() => onPrompt(prompt)}>
            <span>{icon}</span>
            <strong>{label}</strong>
            <small>{prompt}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeMessage;
